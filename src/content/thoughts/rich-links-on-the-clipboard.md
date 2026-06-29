---
title: rich links on the clipboard
description: how some sites copy formatted links that paste pretty into slack
pubDate: 2026-06-29
tags:
  - javascript
  - learning
---

Ever notice how after copying from a website, what later lands in Slack is a clean
clickable label rather than a wall of URL?
I first noticed it in Harness, and have since started spotting this pattern in a handful of
other tools I use daily. It feels like magic until you realise the clipboard's been a
multi-format party platter the whole time and you just weren't invited!

Here's what's going on, why it works, and how to wire it up yourself (with a little demo
at the end so you can poke at it.)

## the clipboard isn't a string

The clipboard can hold the same content in several representations at once. When you copy
from a rich-text editor, your OS receives a `text/html` flavour alongside a `text/plain`
fallback. An app like Slack reads the HTML and renders it as a hyperlink; a plain
`<textarea>` only receives the URL string - each surface picks the payload it understands.

So a "formatted hyperlink" on the clipboard is really:

- `text/html` → `<a href="https://...">my thoughts page</a>`
- `text/plain` → `https://...`

That's the whole trick. Once you know what's on the clipboard, the rest is plumbing.

## the modern API

`navigator.clipboard.write` takes a `ClipboardItem` that can carry multiple MIME types
at once:

```ts
async function copyFormattedLink(label: string, url: string) {
  const html = `<a href="${url}">${label}</a>`

  await navigator.clipboard.write([
    new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([url], { type: 'text/plain' }),
    }),
  ])
}
```

Two caveats worth knowing up front:

- **User gesture required.** Browsers reject this unless it's inside a click handler
  (or another user-initiated event). So no sneaky auto-copying on page load.
- **Secure context only.** Needs HTTPS or `localhost`. `file://` and plain HTTP won't get
  you `navigator.clipboard.write`.

This is what a custom "Copy link" button does under the hood. Perfect when _you_ own
the trigger.

## intercepting the actual copy event

The API above is great for a button you control, but it doesn't help when the user
reaches for the _browser's_ native copy (right-click → Copy, or Cmd/Ctrl+C). For that
you listen for the `copy` event and rewrite the clipboard payload before it gets baked:

```ts
document.addEventListener('copy', (event) => {
  const selection = document.getSelection()
  if (!selection?.toString()) return

  event.preventDefault()
  event.clipboardData.setData('text/html', `<a href="${url}">${label}</a>`)
  event.clipboardData.setData('text/plain', url)
})
```

The `preventDefault()` is crucial here (as it usually is) - skip it and the browser's default
payload writes straight over the data you just set.

This is how the "right-click and Copy gives me a rich hyperlink" trick is usually done.
The context menu is browser's own, but your page just hijacks what gets copied.

## try it yourself

Below is a link wired up with a copy-event interceptor. Select the words
"my thoughts page", copy them (Cmd/Ctrl+C or right-click → Copy), then paste into both
fields underneath to see what each one received.

<div
  oncopy="event.preventDefault(); event.clipboardData.setData('text/html', '<a href=&quot;https://andreasvirkus.me/thoughts&quot;>my thoughts page</a>'); event.clipboardData.setData('text/plain', 'https://andreasvirkus.me/thoughts');"
  style="padding: 0.75em 1em; border: 1px dashed currentColor; border-radius: 6px; margin: 1em 0;"
>
  ✂️ Select &amp; copy this: <a href="/thoughts">my thoughts page</a>
</div>

**Plain-text target**, which sees the URL fallback:

<input
  type="text"
  placeholder="paste here…"
  style="display: block; width: 100%; padding: 0.5em 0.75em; margin: 0.5em 0 1.25em; border: 1px solid currentColor; border-radius: 6px; background: transparent; color: inherit;"
/>

**Rich-text target**, which sees the formatted link:

<div
  contenteditable="true"
  style="display: block; min-height: 2.5em; padding: 0.5em 0.75em; margin: 0.5em 0 1.25em; border: 1px solid currentColor; border-radius: 6px;"
>paste here…</div>

The clipboard served the same payload to both; each one just pulled the flavour it knows
how to handle. Slack and Notion, once you paste into them, go a step further and translate
the `text/html` into their own formatting models (Slack's `<url|label>` syntax, Notion's
link block), but what's on the clipboard itself doesn't change.

## a few gotchas

A handful of things I've tripped over wiring this up before:

- **Scoping the interceptor.** A global `document.addEventListener('copy', …)` will rewrite
  _every_ copy on the page, including selections of unrelated text. Scope it to the
  element you care about (or check `selection.containsNode(yourLink)` before rewriting).
- **Newlines in the label.** If your label spans block elements, browsers may insert
  stray `<br>` or `<p>` into the HTML payload. Build the `<a>` string yourself rather
  than copying from `selection.toString()`.
- **iOS Safari.** Long-press → Copy fires the `copy` event normally, but the synchronous
  `navigator.clipboard.write` path is finickier, so keep your button handler short and
  awaitable.

---

The wider lesson, if there is one: the clipboard is more capable than its `Cmd+C / Cmd+V`
reputation suggests. A handful of lines on the copy side make URLs land prettier on the
paste side, and your users will quietly thank you every time they share a link in chat.

Maybe in the future we'll also explore handling media in clipboards, as that is a thorny UX
if sites have not considered it, and equally feels like magic if catered to correctly!
