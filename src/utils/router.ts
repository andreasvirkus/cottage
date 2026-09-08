import { playSound, type Sound } from './play-sound'

const parser = new DOMParser()

function isSoftNavigable(link: HTMLAnchorElement) {
  if (link.origin !== location.origin) return false
  if (link.target && link.target !== '_self') return false
  if (link.hasAttribute('download')) return false
  if (link.href === location.href) return false
  if (link.pathname === location.pathname && link.search === location.search && link.hash) return false
  return true
}

function mergeHeadStyles(newHead: HTMLHeadElement) {
  const seen = new Set(Array.from(document.head.querySelectorAll('style')).map((style) => style.textContent))
  newHead.querySelectorAll('style').forEach((style) => {
    if (!seen.has(style.textContent)) document.head.appendChild(style.cloneNode(true))
  })
}

function syncHeadAttr(newHead: HTMLHeadElement, selector: string, attr: string) {
  const value = newHead.querySelector(selector)?.getAttribute(attr)
  if (value) document.head.querySelector(selector)?.setAttribute(attr, value)
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

function scrollToTarget(hash: string) {
  if (!hash) {
    window.scrollTo(0, 0)
    return
  }
  document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
}

async function swap(url: string, { push }: { push: boolean }) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Navigation fetch failed: ${response.status}`)

  const nextDoc = parser.parseFromString(await response.text(), 'text/html')
  const nextMain = nextDoc.querySelector('main')
  const currentMain = document.querySelector('main')
  if (!nextMain || !currentMain) throw new Error('No <main> to swap')

  // Page CSS ships inlined per-page (astro.config `inlineStylesheets: always'),
  // so a page-specific style block only exists in the fetched <head>.
  mergeHeadStyles(nextDoc.head)

  const applyContent = () => {
    currentMain.innerHTML = nextMain.innerHTML
    // innerHTML-inserted <script> tags don't execute — replace them so they do.
    reviveScripts(currentMain)
  }

  if ('startViewTransition' in document) {
    await (document as any).startViewTransition(applyContent).finished
  } else {
    applyContent()
  }

  document.title = nextDoc.title
  syncHeadAttr(nextDoc.head, 'link[rel="canonical"]', 'href')
  syncHeadAttr(nextDoc.head, 'meta[name="description"]', 'content')

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
}
