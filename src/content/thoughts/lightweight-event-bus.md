---
title: lightweight event bus
description: native event bus on 12 lines of code
pubDate: 2025-02-22
tags:
  - javascript
---

An event bus can be a useful tool to communicate between components or parts of your app.
It's especially useful with modern frameworks, if you can't (or find it too cumbersome) to pass events or props
down multiple levels to a nested child, or if the 2 parts are not in a child-parent relation at all.

Of course there are proper state management tools that you'd eventually want to reach for, but a
light event bus solution can delay the pain of setup and managing of a more complex state store.

Did you know we can utilise the built-in events to create a lightweight event bus with just ~10 lines?
Here's the meat of it:

```js
export const EventBus = {
  $on (eventType, callback) {
    document.addEventListener(eventType, (ev) => callback(ev.detail))
  },
  $dispatch (eventType, data) {
    const event = new CustomEvent(eventType, { detail: data })
    document.dispatchEvent(event)
  },
  $off (eventType, callback) {
    document.removeEventListener(eventType, callback)
  }
}
```

Then, let's say in a component, you can listen to events
```js
EventBus.$on('user.connect', (data) => console.log(data))
```

And dispatch them from wherever!

```js
EventBus.$dispatch('user.connect', { some: 'data' })
```