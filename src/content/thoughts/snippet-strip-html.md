---
title: Strip HTML the easy way
description: Forget the regex and use a DOMParser
pubDate: 2023-12-15
tags:
  - snippet
  - javascript
---

Ever needed to display the textual content of a string, but there's just these pesky
HTML tags in the way? Maybe you have some external data that you don't control
and just want to show your user a content of an email, maybe some HTML snippet you grabbed with a
web crawler... whatever the case – I know you've reached for regex before to parse out
those tags, find a matching closing tag, yada-yada.

Well no more! You can utilise the [DOMParser]() API, which has a useful `parseFromString` method that returns a brand new HTMLDocument for us. The great thing about that is its `textContent`s are
then available to us, *sans*-tags!

```js
export const strip = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent || '').trim()
}
```

If we now run the following string through it:

```html
<div>
  <h1>Fancy-schmancy title</h2>
  <h2>Fancy sub-title</h2>
  <p>And some not that fancy body text.</p>
</div>
```

Then we get out the following. As you can see, it even respects block-elements and produces newlines between them. This is great for keeping some basic level of formatting from your source
document.

```
'Fancy-schmancy title\n  Fancy sub-title\n  And some not that fancy body text.'
```