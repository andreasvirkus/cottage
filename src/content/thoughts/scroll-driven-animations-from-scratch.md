---
title: css scroll-driven animations from scratch

description: a complete walkthrough of scroll-timeline, view-timeline, and animation-range
pubDate: 2026-02-25
draft: true
tags:
  - css
---

I've touched on [scroll-padding](/thoughts/get-your-scroll-on) before, but CSS's scroll
story has gotten _much_ more interesting since then. Scroll-driven animations let you
tie any CSS animation to scroll progress — no JavaScript, no IntersectionObserver,
no scroll event listeners, no `requestAnimationFrame` loops. Just CSS.

Let's build this up from zero.

## The core idea

A traditional CSS animation runs on a _time_ timeline: it starts, plays for N seconds,
and ends. Scroll-driven animations replace that time-based timeline with a _scroll-based_
one. Instead of "play over 2 seconds," you're saying "play as the user scrolls from
point A to point B."

The animation itself is still a regular `@keyframes` block. The only thing that changes
is what _drives_ it.

## `scroll-timeline` — progress of a scroll container

The simplest version: animate something based on how far a container has been scrolled.

```css
@keyframes shrink-header {
  from {
    padding-block: 2rem;
    font-size: 1.5rem;
  }
  to {
    padding-block: 0.5rem;
    font-size: 1rem;
  }
}

.header {
  animation: shrink-header linear both;
  animation-timeline: scroll();
}
```

That's it. The header shrinks as you scroll down the page. `scroll()` defaults to the
nearest scrollable ancestor (usually the root scroller). The animation progress maps
to the scroll progress: 0% scrolled = `from`, 100% scrolled = `to`.

You can also specify which scroll container and axis:

```css
animation-timeline: scroll(root block);   /* root scroller, vertical */
animation-timeline: scroll(nearest inline); /* nearest scroller, horizontal */
```

## `view-timeline` — visibility of an element

This is the one that replaces IntersectionObserver for animation purposes.
`view()` creates a timeline based on an element's visibility within a scroll container.

```css
@keyframes fade-in {
  from {
    opacity: 0;
    translate: 0 3rem;
  }
  to {
    opacity: 1;
    translate: 0;
  }
}

.card {
  animation: fade-in linear both;
  animation-timeline: view();
}
```

As the `.card` scrolls into the viewport, the animation plays. Scroll it out, and it
reverses. It's the "reveal on scroll" pattern that used to require a library, now in
4 lines of CSS.

## `animation-range` — the precision tool

Here's where it gets powerful. By default, `view()` maps the full animation to the full
visibility range — from the element's first pixel entering the viewport to its last pixel
leaving. That's a _lot_ of range. Usually, you want the animation to complete sooner.

`animation-range` lets you narrow it down:

```css
.card {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

This means: start the animation when the element begins entering (`entry 0%`) and finish
it when the element has fully entered (`entry 100%`). The element fades in as it scrolls
into view and stays fully visible after.

The available range keywords:

| Keyword   | Meaning                                        |
| --------- | ---------------------------------------------- |
| `entry`   | Element is entering the scrollport              |
| `exit`    | Element is exiting the scrollport               |
| `contain` | Element is fully contained in the scrollport    |
| `cover`   | From first entering to fully exiting            |

You can mix them:

```css
/* Fade in during entry, fade out during exit */
animation-range: entry 0% exit 100%;

/* Only animate while fully in view */
animation-range: contain 0% contain 100%;
```

## A practical example: progress bar

A reading progress indicator used to require JavaScript to calculate scroll percentage
and update a width. Now:

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  transform-origin: left;
  animation: grow-bar linear both;
  animation-timeline: scroll();
}

@keyframes grow-bar {
  from { scale: 0 1; }
  to { scale: 1 1; }
}
```

Zero JavaScript reading progress bar. It updates on every frame, synced perfectly
to scroll position, running on the compositor thread.

## A practical example: parallax

Parallax effects have always been JS-heavy. Not anymore:

```css
.hero-image {
  animation: parallax linear both;
  animation-timeline: scroll();
}

@keyframes parallax {
  from { translate: 0 -5rem; }
  to { translate: 0 5rem; }
}
```

The image moves at a different rate than the scroll, creating a parallax effect.
Adjust the translate values to control the intensity. Runs at 60fps because
it's on the compositor thread.

## Graceful degradation

Not all browsers support scroll-driven animations yet. The good news is that
the degradation is graceful — the `animation-timeline` property is simply ignored
in unsupported browsers, and since we're using `linear` with `both` fill mode,
the element just renders in its final state. No broken layouts, no missing content.

If you want to be explicit:

```css
@supports (animation-timeline: view()) {
  .card {
    opacity: 0;
    animation: fade-in linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }
}
```

This way, the initial `opacity: 0` only applies when the browser can actually run
the scroll-driven animation to reveal it.

## The bigger picture

What I love about scroll-driven animations is that they're _declarative_. You describe
what should happen and the browser figures out the performance characteristics.
No debouncing, no throttling, no `will-change` hacks, no fighting the main thread.

Combined with view transitions and anchor positioning, CSS is becoming a genuinely
complete animation and layout system. The JavaScript we wrote to compensate for its
limitations is slowly becoming optional.

And that's a good thing.
