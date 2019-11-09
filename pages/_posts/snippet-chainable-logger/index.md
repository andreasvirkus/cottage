---
title: "snippet #3 - Chainable Logger"
layout: Post
description: Logging is always the missing link of your dev chain
date: 2019-11-07
draft: true
tags:
  - snippet
  - javascript
---

As functional programming becomes more popular in the JavaScript realm, so do
[Higher-Order Functions](https://www.freecodecamp.org/news/a-quick-intro-to-higher-order-functions-in-javascript-1a014f89c6b/)

As a lover of terse JavaScript, I often use the shorthand return pattern
for fat-arrow functions, such as

```js
const paidPlans = plans.filter(plan => plan.subscriptionId)
```

Instead of taking the long route, e.g.
```js
const paidPlans = plans.filter(plan => {
  return !!plan.subscriptionId
})
```

Even though the first approach is aesthetic for me personally and reads nicely
when chained with other Higher-Order Functions (like `.map()`), it has a major
drawback when it comes to debugging.

This should now be the part where I preach about using your browser's developer
tools correctly, firing up those breakpoints and stepping through your code.
But I'm a realist. Either you've never took the time to learn the
[Debugger]()
or you're thinking that this quick anomaly _has_ to have a simple reason and
it's not worth the effort of breakpoints.

```js
// A chainable logger
// https://dev.to/easilybaffled/why-we-make-room-for-console-log-2j52
console.tap = v => {
  console.log(v)
  return v
}
```