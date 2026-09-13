import { playSound, type Sound } from './play-sound'

interface PageSnapshot {
  mainHTML: string
  title: string
  styles: string[]
  canonical?: string | undefined
  description?: string | undefined
}

const parser = new DOMParser()
const cache = new Map<string, PageSnapshot>()

function isSoftNavigable(link: HTMLAnchorElement) {
  if (link.origin !== location.origin) return false
  if (link.target && link.target !== '_self') return false
  if (link.hasAttribute('download')) return false
  if (link.href === location.href) return false
  if (link.pathname === location.pathname && link.search === location.search && link.hash) return false
  return true
}

function snapshotFromDocument(doc: Document): PageSnapshot {
  const main = doc.querySelector('main')
  if (!main) throw new Error('No <main> in fetched document')

  return {
    mainHTML: main.innerHTML,
    title: doc.title,
    styles: Array.from(doc.head.querySelectorAll('style')).map((style) => style.textContent || ''),
    canonical: doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href') || undefined,
    description: doc.head.querySelector('meta[name="description"]')?.getAttribute('content') || undefined,
  }
}

async function getSnapshot(url: string): Promise<PageSnapshot> {
  const cached = cache.get(url)
  if (cached) return cached

  const response = await fetch(url)
  if (!response.ok) throw new Error(`Navigation fetch failed: ${response.status}`)

  const snapshot = snapshotFromDocument(parser.parseFromString(await response.text(), 'text/html'))
  cache.set(url, snapshot)
  return snapshot
}

function mergeHeadStyles(styles: string[]) {
  const seen = new Set(Array.from(document.head.querySelectorAll('style')).map((style) => style.textContent))
  styles.forEach((text) => {
    if (seen.has(text)) return
    const style = document.createElement('style')
    style.textContent = text
    document.head.appendChild(style)
    seen.add(text)
  })
}

function reviveScripts(root: Element) {
  root.querySelectorAll('script').forEach((old) => {
    const fresh = document.createElement('script')
    for (const { name, value } of Array.from(old.attributes)) fresh.setAttribute(name, value)
    fresh.textContent = old.textContent
    // Astro hoists <script> blocks to a URL-addressed module, and the browser's
    // module registry only runs a given URL's top-level code once per document —
    // bust it so revisiting a page re-attaches that page's own listeners.
    if (fresh.src) fresh.src += (fresh.src.includes('?') ? '&' : '?') + '_swap=' + Date.now()
    old.replaceWith(fresh)
  })
}

// Mirrors HeaderLink.astro's server-rendered isActive logic — the header persists
// across swaps, so its "current page" state needs the same rules reapplied in JS.
function syncActiveNav(pathname: string) {
  document.querySelectorAll('header a[href]').forEach((link) => {
    const href = link.getAttribute('href') || ''
    let active = href === pathname || href === pathname.replace(/\/$/, '')
    if (pathname.startsWith('/thoughts/') && href.startsWith('/thoughts')) active = true
    if (pathname === '/cv/' && href.startsWith('/me')) active = true
    link.classList.toggle('active', active)
  })
}

const PREFETCH_DELAY = 65
let prefetchTimer: ReturnType<typeof setTimeout> | undefined

function schedulePrefetch(link: HTMLAnchorElement) {
  if (!isSoftNavigable(link)) return
  if (cache.has(link.href)) return
  if ((navigator as any).connection?.saveData) return

  clearTimeout(prefetchTimer)
  prefetchTimer = setTimeout(() => {
    getSnapshot(link.href).catch(() => {})
  }, PREFETCH_DELAY)
}

function cancelPrefetch() {
  clearTimeout(prefetchTimer)
}

function scrollToTarget(hash: string) {
  // html has scroll-behavior: smooth globally (for in-page anchor links) — override
  // it here so post <> list navigations jump instantly instead of animating.
  if (!hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return
  }
  document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'instant' })
}

async function swap(url: string, { push }: { push: boolean }) {
  const snapshot = await getSnapshot(url)
  const currentMain = document.querySelector('main')
  if (!currentMain) throw new Error('No <main> to swap into')

  // Page CSS ships inlined per-page (astro.config `inlineStylesheets: always'),
  // so a page-specific style block only exists in the fetched <head>.
  mergeHeadStyles(snapshot.styles)

  const applyContent = () => {
    currentMain.innerHTML = snapshot.mainHTML
    // innerHTML-inserted <script> tags don't execute — replace them so they do.
    reviveScripts(currentMain)
  }

  if ('startViewTransition' in document) {
    await (document as any).startViewTransition(applyContent).finished
  } else {
    applyContent()
  }

  document.title = snapshot.title
  if (snapshot.canonical) document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', snapshot.canonical)
  if (snapshot.description) document.head.querySelector('meta[name="description"]')?.setAttribute('content', snapshot.description)

  const target = new URL(url, location.href)
  if (push) history.pushState({}, '', target)
  syncActiveNav(target.pathname)
  scrollToTarget(target.hash)
  ;(window as any).goatcounter?.count?.()

  window.dispatchEvent(new CustomEvent('cottage:navigate'))
}

export function navigate(url: string) {
  swap(url, { push: true }).catch(() => {
    location.href = url
  })
}

export function initRouter() {
  // Seed the cache with the page we're already on, as plain strings (not a live
  // reference) — future swaps mutate the real document, so caching the element
  // itself would silently rot into whatever page the user later navigates to.
  cache.set(location.href, snapshotFromDocument(document))

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    let soundTarget = event.target as HTMLElement | null
    if (soundTarget?.dataset.sound === undefined) {
      soundTarget = soundTarget?.closest('[data-sound]') ?? null
    }
    if (soundTarget) playSound(soundTarget.dataset.sound as Sound)

    const link = (event.target as HTMLElement)?.closest('a')
    if (!link) return

    if (isSoftNavigable(link)) {
      event.preventDefault()
      navigate(link.href)
      return
    }

    // External/new-tab/download links: give the click sound a head start before the hard nav tears the page down.
    if (soundTarget) {
      event.preventDefault()
      setTimeout(() => {
        location.href = link.href
      }, 350)
    }
  })

  window.addEventListener('popstate', () => {
    swap(location.href, { push: false }).catch(() => location.reload())
  })

  // mouseenter/mouseleave don't bubble — capture phase still walks past every
  // descendant on the way to the target, so this delegates from one listener.
  document.addEventListener(
    'mouseenter',
    (event) => {
      const link = (event.target as HTMLElement)?.closest?.('a')
      if (link) schedulePrefetch(link)
    },
    { capture: true },
  )
  document.addEventListener('mouseleave', cancelPrefetch, { capture: true })

  // Same warm-up for keyboard navigation — focusin/focusout bubble, no capture needed.
  document.addEventListener('focusin', (event) => {
    const link = (event.target as HTMLElement)?.closest?.('a')
    if (link) schedulePrefetch(link)
  })
  document.addEventListener('focusout', cancelPrefetch)
}
