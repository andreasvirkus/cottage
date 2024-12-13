---
title: get your scroll on
description: Forget about annoying headers covering content post-scroll
pubDate: 2024-09-26
tags:
  - css
---

You know how you sometimes just need a native anchor scroll with a good old `/page#section` link?
You slap a nice `scroll-behavior: smooth` rule into your CSS, so users would think you've spent a while polishing those
scroll animations, the browser does all the heavy lifting and the person is gracefully courted to their
`#section` of choice... And then a header covers the top 10% of said section 😑.

Well have I got a solution for you; and basically free! Alright, _you smooth talker_, we're good friends by this point, totally free!
CSS has a helpful `scroll-padding-top` property that you can use. Usually you'd apply it to the `html` element
along with the scroll behavior

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 40px;
}
```

...but there's nothing stopping you from applying it to a specific element instead/as well.
Note that for truly accessible styling (much like [padding-block](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block)), you can use CSS **logical** start/end directions instead,
for example `scroll-padding-block-start`.

If you click `LINK`, you can see that the trivia fact isn't blocked under the sticky header and nicely in view.

<div class="demo">
  <style>
    .demo {
      display: grid;
      place-items: center;
      margin: 4rem auto 12rem;
      max-width: 65ch;
      border-left: 3px dashed #b3b3b3;
      border-right: 3px dashed #b3b3b3;
      max-height: 20vh;
      overflow-y: auto;
      scroll-behavior: smooth;
      scroll-padding-top: 40px;
    }
    .demo section {
      padding: 3rem 0;
    }
    .demo header {
      position: sticky;
      top: 0;
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: space-between;
      gap: 4rem;
      padding-top: 1rem;
    }
    .demo .logo {
      border: 2px solid;
      padding: 4px 8px;
    }
  </style>


  <header class="flex">
    <span class="logo">Website?</span>
    <nav>
      <a href="#">Click</a> |
      <a href="#">the</a> |
      <a href="#">third</a> |
      <a href="#meow" style="color: tomato">LINK</a>
    </nav>
  </header>

  <section>
    Just a bit of filler text so we'd get some scroll going.
  </section>
  <section>
    Just a bit of filler text so we'd get some scroll going.
  </section>
  <section>
    Just a bit of filler text so we'd get some scroll going.
  </section>

  <section id="meow">
    Milk is actually harmful for cats 🙀
  </section>


  <section>That's all, off you go now!</section>
</div>
