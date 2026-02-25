---
title: building with the platform

description: why browser-native APIs age better than abstractions
pubDate: 2026-02-25
draft: true
tags:
  - javascript
  - learning
---

I have a confession: I'm a boring developer. When someone shows me a shiny new library
that abstracts away some browser API, my first instinct is to check what browser API
it's abstracting. More often than not, the API itself is perfectly usable, and the
library is solving a problem I don't have.

This isn't about being a purist. It's about making a bet on what will still work in 5 years.

## The libraries I didn't install

Here's a non-exhaustive list of things I've reached for native APIs instead of libraries:

**Event systems** — I wrote about [lightweight event buses](/thoughts/lightweight-event-bus)
using `CustomEvent` and `EventTarget`. It's 15 lines. It works everywhere. No library needed.

**Date formatting** — `Intl.DateTimeFormat` handles locale-aware date formatting that used to
require Moment.js (rest in peace) or date-fns. The API is a bit verbose, sure,
but it handles edge cases that your hand-rolled formatter never will.

**Number & string formatting** — `Intl.PluralRules` for [ordinal suffixes](/thoughts/translate-ordinal-suffixes),
`Intl.NumberFormat` for currencies and compact notation, `Intl.ListFormat` for joining
arrays into human-readable lists. The `Intl` namespace is criminally underused.

**DOM parsing** — Need to [strip HTML](/thoughts/snippet-strip-html) from a string? `DOMParser` is right there.
Want to [create a DOM node from a string](/thoughts/snippet-string-to-html)? `<template>` elements have you covered.
No need for a sanitization library unless you're dealing with untrusted input
(and even then, the Sanitizer API is coming).

**Scroll effects** — `IntersectionObserver` replaced scroll event listeners.
`scroll-behavior: smooth` replaced smooth-scroll libraries. `scroll-padding-top`
replaced offset calculation hacks. All native. All free.

## Why platform APIs age well

There's a practical reason to prefer platform APIs: **they don't break**.

A library you depend on today might be unmaintained in two years. Its API might change
in a major version bump. It might have a dependency that has a dependency that has a
security vulnerability. The browser API, on the other hand, has a _commitment to
backwards compatibility_ that no library can match. `document.getElementById` from
1998 still works. That's not a bug; that's the web's greatest feature.

The code I wrote for my blog in 2019 using `CustomEvent` and `:target` pseudo-classes still works,
unchanged, in 2026. The Metalsmith plugins I wrote in 2017? Also still work, but the ecosystem
around them has evaporated. The platform stayed. The abstractions didn't.

## When to reach for a library

I'm not saying "never use libraries." That would be absurd. Here's my rough heuristic:

- **Use a library** when the browser API is genuinely painful (e.g., WebGL — use Three.js),
  when you need cross-browser polyfilling for cutting-edge features, or when the library
  provides significant architectural value (a framework _is_ a library).
- **Skip the library** when the browser API is ~80% as convenient, when you're only using
  10% of the library's features, or when the library is essentially a thin wrapper with
  a nicer syntax.

The question isn't "Is this library good?" — it's "Is this library worth the dependency?"

## The compound effect

Every native API you use instead of a library is one fewer entry in `package.json`.
One fewer thing to audit, update, and worry about. One fewer thing that can break
when you come back to the project after 6 months.

It compounds. A project built mostly on platform APIs feels _lighter_. Not just in bundle
size (though that too), but in cognitive overhead. There's less to remember, less to look up,
and when you do need to look something up, MDN is right there — stable, comprehensive,
and not going anywhere.

Build with the platform. It's not going anywhere either.
