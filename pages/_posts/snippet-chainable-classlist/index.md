---
title: "snippet #4 - chainable classList"
layout: Post
description: Logging is always the missing link of your dev chain
date: 2019-11-10
tags:
  - snippet
  - javascript
---

Let's keep this one short:

```js
function classList(el) {
  const list = el.classList

  return {
    add: function(c) { list.add(c); return this },
    toggle: function(c) { list.toggle(c); return this },
    remove: function(c) { list.remove(c); return this }
  }
}
```

And then chain away!

```js
classList(el).remove('foo').add('bar').toggle('baz')
```