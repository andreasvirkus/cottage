---
title: the css that replaced my javascript

description: a love letter to the platform catching up
pubDate: 2026-02-25
draft: true
tags:
  - css
  - javascript
---

I've been writing CSS and JavaScript professionally for close to a decade now. And for most of that
time, I've had to reach for JavaScript to do things that _felt_ like they should be CSS's job.
Dropdowns, scroll effects, container-aware layouts, color manipulation... the list goes on.

But the last few years have been a quiet revolution. CSS has been shipping features at a pace that
would make most JS frameworks jealous. And one by one, I've been deleting JavaScript from my projects
and replacing it with a few lines of CSS. So here's my personal hitlist of CSS features
that retired their JS counterparts.

## `:has()` — the parent selector we begged for

For years, "CSS can't select parents" was the go-to example of CSS's limitations.
We wrote JavaScript to add classes to parent elements based on their children's state.
Toggle a class on a wrapper when an input inside it is focused. Show a sibling when a checkbox is checked.
All JS. All unnecessary now.

```css
/* Highlight a form group when its input is focused */
.form-group:has(input:focus) {
  border-color: var(--accent);
}

/* Show helper text when a checkbox is checked */
.section:has(input[type="checkbox"]:checked) .helper {
  display: block;
}
```

The amount of `querySelector` + `classList.toggle` calls I've replaced with `:has()` is frankly embarrassing.

## Container queries — responsive _components_

Media queries are great for page-level layouts, but they fall apart when you have
a component that lives in different contexts. A card in a sidebar vs. a card in the main content
area — same component, different available space. The JS solution was always ResizeObserver
plus manually toggling classes. It worked, but it was a lot of ceremony for what should
be a styling concern.

```css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

No observers. No event listeners. No layout thrashing. Just CSS doing CSS things.

## `color-mix()` — runtime color manipulation

I've [written about this before](/thoughts/modern-css-color-mixing), but it bears repeating.
Before `color-mix()`, if you wanted to derive a lighter or semi-transparent version of a
CSS custom property, you either needed a preprocessor, had to split your colors into
individual channels, or reached for JS.

```css
/* Before: awkward channel splitting */
--accent-r: 34;
--accent-g: 34;
--accent-b: 51;
background: rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.7);

/* After: just... mix it */
background: color-mix(in srgb, var(--accent) 70%, transparent);
```

The old approach was a crime against readability. Good riddance.

## Scroll-driven animations

I've written scroll-based animations with IntersectionObserver, with scroll event
listeners (don't judge me, it was 2017), and with libraries like GSAP's ScrollTrigger.
They all worked. They were also all more code than I wanted for "fade this in when it
scrolls into view."

```css
@keyframes fade-in {
  from { opacity: 0; translate: 0 2rem; }
  to { opacity: 1; translate: 0; }
}

.reveal {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

Pure CSS. No JS. No library. It runs on the compositor thread so it's buttery smooth,
and it degrades gracefully in older browsers (the element just... appears, which is fine).

## Anchor positioning

This one's newer and I'm still getting comfortable with it, but it's already replaced
a few tooltip/popover positioning scripts. The old way: calculate the target element's
bounding rect, account for scroll offset, check if it overflows the viewport, flip it,
and pray. The new way:

```css
.tooltip {
  position: fixed;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
  position-try-fallbacks: flip-block;
}
```

CSS handles the overflow flipping for you. That's maybe 200 lines of JS I don't need anymore.

## What I've learned

The pattern is always the same: we use JavaScript to work around CSS's limitations,
those workarounds calcify into "best practices" and libraries, and then CSS ships the
feature and we forget to go back and simplify. The JS stays in the codebase, now legacy,
now another dependency to maintain.

I think there's a lesson here beyond just CSS. Whenever you reach for a JavaScript
solution to a _visual_ problem, ask yourself: "Is this JS because it _has_ to be,
or because CSS couldn't do it when I last checked?" The answer might surprise you.

The platform is catching up. Let it.
