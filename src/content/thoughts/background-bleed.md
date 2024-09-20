---
title: background bleed
description: No parent sets my limits!
pubDate: 2024-08-09
tags:
  - css
---

Here's a nifty way to escape a container's width limitations when you need
a full-width background colour for a single section. Many thanks to [Kevin Powell](https://www.youtube.com/shorts/81pnuZFarRw) for sharing it.

```css
.full-bleed {
  --bg: #223;
  box-shadow: 0 0 0 100vmax var(--bg);
  clip-path: inset(0 -100vmax);
  background-color: var(--bg);
}
```

Aaaand here's a demo:

<main class="demo">
  <style>
    .full-bleed {
      --bg: #2a1b2a;
      box-shadow: 0 0 0 100vmax var(--bg);
      clip-path: inset(0 -100vmax);
      background-color: var(--bg);
      color: #d3bbd3;
    }
    main.demo {
      display: grid;
      place-items: center;
      margin: 4rem auto 12rem;
      max-width: 65ch;
      border-left: 3px dashed #b3b3b3;
      border-right: 3px dashed #b3b3b3;
    }
    .demo section {
      padding: 2rem 0;
    }
    .demo code {
      font-family: monospace;
      background-color: #ddd;
      font-size: 1rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: indigo;
    }
    .demo pre {
      background: #ddd;
      padding: 1rem;
    }
    .demo h1 {
      font-family: monospace;
      font-size: 3rem;
    }
    .demo em {
      font-style: italic;
    }
  </style>


  <h1>Alice in Wonderland</h1>

  <section>
    The <code>main</code> element's width is limited to <code>65ch</code> (roughly 650px), but we'd want one of its child elements to have a full-width background; what to do... 🤔
  </section>

  <section class="full-bleed">
  “Well! I’ve often seen a cat without a grin,” thought Alice; “but a grin without a cat! It’s the most curious thing I ever saw in all my life!”
  <br>—Chapter 6, Pig and Pepper</section>


  <section>...rest of the book goes here?</section>
</main>
