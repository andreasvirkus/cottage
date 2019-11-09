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
[Higher-Order Functions](https://www.freecodecamp.org/news/a-quick-intro-to-higher-order-functions-in-javascript-1a014f89c6b/) and us
constantly depending on `.filter()`, `.map()`, `.forEach()`, and friends
to modify our data.

As a lover of terse JavaScript, I often use the shorthand return pattern
for fat-arrow functions, such as

```js
const paidPlans = plans.filter(plan => plan.subscriptionId)

// Instead of 👇
const paidPlans = plans.filter(plan => {
  return !!plan.subscriptionId
})
```

Even though the first approach is aesthetic for me personally and reads nicely
when chained with other Higher-Order Functions (like `.map()`), it has a major
drawback when it comes to debugging.

This should now be the part where I preach about using your browser's developer
tools correctly, firing up those breakpoints and stepping through your code.
But I'm a realist. Either you've never took the time to learn to use breakpoints & the
[Sources](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints)
tab, or you're thinking that this quick anomaly _has_ to have a simple reason and
it's not worth the effort of breakpoints. But you already know how it goes...

Now that we've established that `console.log` is that goofy friend you're ashamed
of (but still call up when you have nothing to do on a Friday night), why not
learn to reap more value from it? The main idea is to keep the chainability. Therefore,
we need to return the same array/value that it's called upon. Let's not modify the prototype
directly, since then it would get looped over with `for (a in array)`, but we can use
`Object.defineProperty()`:

```js
Object.defineProperty(Array.prototype, 'log',  {
  value: function () {
    (this).forEach(item => console.log(item))
  }
})
```

And now it's a breeze to check whether or not an array contains
the right data. No more interim variables or having to write
explicit return statements since you had to call `console.log`
on the line above 😬 Rejoice!
```js
const newArray = oldArray
  .sort(someSortMethod)
  .filter(i => i.quantity > 5)
  .log() // Wooh - found my mistake in seconds!
  .map(i => i.name)
```
