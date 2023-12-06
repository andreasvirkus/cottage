---
title: 'snippet #2 - wait'

description: A small timeout utility for development
pubDate: 2019-11-08
tags:
  - snippet
  - javascript
---

One of the first things I do for new projects is to copy over some common utility files,
to keep in my handy `src/utils/` belt. Today, let's explore a member of that family -
`wait.js`

```js
export default (ms) => new Promise((resolve) => setTimeout(resolve, ms))
```

`wait` can be very useful in a variety of situations. You might need to mock an API
request during development, or maybe want to display a loader for a certain time.\
Whatever the use case, it's very comfy to write

```js
await wait(400)
loadingFlag = false
```

...And slow down every once in a while.
