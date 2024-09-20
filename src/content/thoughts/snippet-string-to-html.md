---
title: generate DOMNode from string
description: Bored of those tedious createElement, appendChild chains?
pubDate: 2023-12-15
tags:
  - snippet
  - javascript
---


```js
export function stringToHtml(html: string): ChildNode {
    var template = document.createElement('template')
    html = html.trim() // Never return a text node of whitespace
    template.innerHTML = html
    return template.content.firstChild
}
```

If we now run the following string through it:
```js
'<div><span>nested</span> <span>stuff</span></div>'
```
it nicely produces...
```html
<div>
  <span>nested</span>
  <span>stuff</span>
</div>
```

So we get back the expected HTML as a Node, which is ready to be appended to a parent element.
**Do not** set it with `innerHTML` unless you're absolutely sure you have 100% control over its contents.

```js
const div = stringToHtml('<div><span>nested</span> <span>stuff</span></div>')
document.body.appendChild(div)
```

This is super useful in some vanilla JS projects, where you don't want to generate 20 divs
by hand and append each to their respective parent element to ensure proper nesting.
For example, it has come in handy in a browser extension when setting up components for the content script.
