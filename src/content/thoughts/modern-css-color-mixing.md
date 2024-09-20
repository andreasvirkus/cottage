---
title: color mixing with modern css
description: Showing how to easily add opacity to a color variable
pubDate: 2024-09-20
tags:
  - css
---

Love the latest CSS color enhancements! It includes a great new `color-mix()` utility that has [very solid browser support](https://caniuse.com/?search=color-mix).
My favourite use-case is tweaking the opacity of an existing CSS variable:

```css
--cursor-color: #223;
background-color: color-mix(in srgb, var(--cursor-color) 70%, transparent);
```

Results in:

<style>
.color-mix-example {
  display: flex;
  align-items: center;
  gap: 16px;
}
.color-mix-example div {
  background-color: var(--code-color);
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
}
.color-mix-example .--mixed {
  background-color: color-mix(in srgb, var(--code-color) 30%, transparent);
}
</style>
<div class="color-mix-example">
  <div></div>
  <div class="--mixed"></div>
</div>

It's also great for lightening/darkening colors and generating color palettes:

<style>
.color-mix-palette {
  display: flex;
  align-items: center;
}
.color-mix-palette div {
  width: 4rem;
  height: 4rem
}
.bg-blue {
  background-color: blue;
}
.bg-blue-light {
  background-color: color-mix(in srgb, blue, white);
}
.bg-blue-lighter {
  background-color: color-mix(in srgb, blue, white 75%);
}
.bg-blue-dark {
  background-color: color-mix(in srgb, blue, black);
}
.bg-blue-darker {
  background-color: color-mix(in srgb, blue, black 75%);
}
</style>

<div class="color-mix-palette">
  <div class="bg-blue"></div>
  <div class="bg-blue-light"></div>
  <div class="bg-blue-lighter"></div>
  <div class="bg-blue-dark"></div>
  <div class="bg-blue-darker"></div>
</div>

```css
.bg-blue {
  background-color: blue;
}
.bg-blue-light {
  background-color: color-mix(in srgb, blue, white);
}
.bg-blue-lighter {
  background-color: color-mix(in srgb, blue, white 75%);
}
.bg-blue-dark {
  background-color: color-mix(in srgb, blue, black);
}
.bg-blue-darker {
  background-color: color-mix(in srgb, blue, black 75%);
}
```