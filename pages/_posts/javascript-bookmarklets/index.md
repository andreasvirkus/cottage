---
title: "javascript bookmarklets"
layout: Post
description:
date: 2019-11-24
tags:
  - javascript
---

Here's something novel: using [JavaScript bookmarklets] to enhance your web experience.


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