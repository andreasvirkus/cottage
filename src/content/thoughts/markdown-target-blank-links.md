---
title: 'markdown target="_blank" links'
description: Properly add target blank attributes to all external links
pubDate: 2023-12-09
tags:
  - snippet
  - javascript
---

If you're looking to open up Markdown's links in a separate tab, you know you'll need to add `target="_blank"` to the resulting anchor tags.

I also hope you're aware that without anything extra, a `_blank` link is exposed to [reversed tab-nabbing](https://securityintelligence.com/posts/what-is-reverse-tabnabbing-and-what-can-you-do-to-stop-it/). What that basically means, is that the link that you take the user to can have access to your site's context (including localStorage, cookies, ...). No bueno. Luckily we can make sure to always append `rel="noreffer noopener"` to those links.

We'll only want to do that to the links that actually link to external resources and leave relative ("local") links untouched. As [marked.js](https://github.com/markedjs/marked) is my most frequent MD converter currently, I'll show how to include it as a plugin, taking inspiration from their [original renderer](https://github.com/markedjs/marked/blob/f95dd443e6285ffb8a248a38aeb1b2b9d4fe2893/lib/marked.js#L974):

```js
const renderer = new marked.Renderer()
const linkRenderer = renderer.link

renderer.link = (href, title, text) => {
  const localLink = href.startsWith(`${location.protocol}//${location.hostname}`)
  const html = linkRenderer.call(renderer, href, title, text)
  return localLink ? html : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `)
}
```

And you can then use it like this:
```js
const html = marked(markdown, { renderer })
```

**Update**: [OWASP](https://owasp.org/www-community/attacks/Reverse_Tabnabbing) reports that from late 2023 onwards, with evergreen browsers, reverse tabnabbing has a lower impact as most browsers implicitly add `rel="noopener"` to links with `target="_blank"`. Still better safe than sorry though. Especially on the web.