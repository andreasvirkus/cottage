---
title: 'stack css transforms'
layout: Post
description: Dynamic CSS transforms with a static offset
date: 2020-04-04
tags:
  - javascript
---

This is something simple but it blew my mind when I discovered it. You can stack [CSS
transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) for the same direction and all of them get applied 🤯

```css
transform: translateY(-100%) translateY(40px);
```

Let me illustrate this with a use-case. Let's say you have a drawer component that slides in and out of view

<button @click="showFirst = !showFirst">toggle #1</button>

<div :class="showFirst && '-show'" class="drawer-h">Peek-a-boo 👀</div>

We would achieve this by moving the container _fully_ off screen with `transform: translateX(100%)`
and then when a certain condition is filled, navigate it back with `transform: translateX(0)`.

But what if we want to keep a certain part of the element visible in one state?
With our current approach, we could fine-tune the initial transform value and end up with something like\
`transform: translateY(75%)` <span class="emoji">👇</span>

<button @click="showSecond = !showSecond">toggle #2</button>

<div class="drawer-container">
  <div :class="showSecond && '-show'" class="drawer-y -partial">Meow<br> ...is what a cat says!</div>
</div>

Again, this works for this example.. But as soon as the content's height changes, the absolute value of the `translateY(75%)`, that works for our current example, will throw us off..

<button @click="showThird = !showThird">toggle #3</button>

<div class="drawer-container">
  <div :class="showThird && '-show'" class="drawer-y -partial -taller">Meow<br> ...is what a cat says! A cat is a feline. Imagine more text here, which makes the container taller
  and hence results in a bigger value for the 75% that we're transforming.</div>
</div>

This is where the stackable transform declarations come in! Let's rework our example with
`transform: translateY(100%) translateY(-50px);`. This example is editable! Toggle it, add some newlines or silly text and toggle it some more. See that no matter the container height, it will always display just the `50px` part from the top.

<button @click="showFourth = !showFourth">toggle #4</button>

<div class="drawer-container">
  <div :class="showFourth && '-show'" class="drawer-y -static -taller" contenteditable>Meow<br> ...is what a cat says! Go ahead and edit this text
  to try out different heights.</div>
</div>

<script>
export default {
  name: 'increment-javascript-date',
  data() {
    return {
      showFirst: false,
      showSecond: false,
      showThird: false,
      showFourth: false,
    }
  }
}
</script>

<style scoped>
button {
  border: 1px dashed #c9c9c9;
  border-radius: 4px;
  box-shadow: 0px 1px 4px rgba(45, 55, 72, 0.12), 0px 1px 2px rgba(45, 55, 72, 0.04);
  background: none;
  transition: border-color 0.3s ease-out;
  cursor: pointer;
  padding: 8px 16px;
}
button:hover {
  border-color: #223;
}
</style>

<style>
.drawer-h {
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: translateX(100%);
  background-color: white;
  box-shadow: 0px 1px 4px rgba(45, 55, 72, 0.12), 0px 1px 2px rgba(45, 55, 72, 0.04);
  padding: 3rem;
  z-index: 9;
}
.drawer-y {
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: translateY(100%);
  background-color: white;
  box-shadow: 0px 1px 4px rgba(45, 55, 72, 0.12), 0px 1px 2px rgba(45, 55, 72, 0.04);
  padding: 1rem;
  z-index: 9;
}
.-taller {
  height: 280px;
}
.drawer-container {
  position: relative;
  overflow: hidden;
  height: 300px;
  border: 2px dashed #999;
}
.-partial {
  transform: translateY(75%);
}
.-static {
  transform: translateY(100%) translateY(-50px);
  height: auto;
}
.-show {
  transform: translate(0, 0);
}
</style>
