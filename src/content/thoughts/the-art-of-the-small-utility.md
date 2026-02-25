---
title: the art of the small utility

description: why tiny composable functions are worth writing about
pubDate: 2026-02-25
draft: true
tags:
  - javascript
  - learning
---

A few years ago, I started a "snippet" series on this blog. Numbered posts, each
sharing a tiny JavaScript utility: a [chainable logger](/thoughts/snippet-chainable-logger),
a [wait function](/thoughts/snippet-wait), a
[chainable classList](/thoughts/snippet-chainable-classlist). Small things. 10–30 lines
of code each.

I stopped numbering them eventually, but I never stopped writing them. Looking back at
my posts, a surprising number are just... small utility functions. A
[word singularizer](/thoughts/singularize-words). An [ordinal suffix translator](/thoughts/translate-ordinal-suffixes).
A [rounding function with stops](/thoughts/round-to-stops). An [event bus in 15 lines](/thoughts/lightweight-event-bus).

I've been thinking about _why_ I keep coming back to these.

## Small functions compound

There's a compounding effect to building a personal library of small utilities. Each one
is trivial on its own, but together they form a toolkit that makes you faster. Not because
any individual function saves significant time, but because the _practice_ of decomposing
problems into small, testable pieces makes you better at decomposing bigger problems too.

It's like scales for a musician. Nobody performs scales at a concert. But the musician
who practiced them daily has better fingers when it matters.

## The right size for a utility

I think there's an art to the size of a utility function. Too small and it's just an alias
(`const add = (a, b) => a + b` — please don't). Too large and it's not a utility anymore;
it's a module with opinions.

The sweet spot, for me, is a function that:

- Does one thing
- Has no dependencies
- Fits in your head without scrolling
- Is useful in at least two different contexts (or _will_ be; you're allowed some intuition here)
- Has a name that makes its behaviour obvious

My [wait](/thoughts/snippet-wait) function is a good example:

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
```

One line. No dependencies. Useful everywhere. The name tells you what it does.
You could write it from memory after seeing it once.

## Why not install a package?

For each of these utilities, there almost certainly exists an npm package that does
the same thing, probably better, and definitely with more edge cases handled.
So why write your own?

Three reasons:

1. **Understanding.** Writing `singularize()` from scratch means you understand English
   pluralization rules (or at least the subset you care about). Installing a package
   means you understand `npm install`.

2. **No dependency.** Your 15-line utility has zero transitive dependencies, zero
   supply chain risk, and zero chance of a breaking change in a minor version bump.
   That's not paranoia; that's just math.

3. **Right-sizing.** A pluralization library handles every edge case in every language.
   Your function handles the 5 rules your app needs. One of these has a 200KB bundle.
   The other has 15 lines.

## Write them down

There's value in writing these small utilities down as blog posts, too. Not because
the world needs another `debounce` implementation, but because:

- It forces you to think about the API properly. "Would I be embarrassed to publish this?"
  is a remarkably effective code review question.
- Future-you will thank present-you. I've searched my own blog more than once to find
  a utility I wrote years ago.
- Someone else might find it useful. A shocking number of developers have never seen
  `Intl.PluralRules` or know that `<template>` elements exist.

## The Unix philosophy, miniaturised

There's a direct line from the Unix philosophy — small programs that do one thing well,
composed via pipes — to the practice of writing small utility functions composed via
function calls. The scale is different, but the principle is identical: small, focused,
composable units are easier to understand, test, and combine than monolithic ones.

I know it's not fashionable. The industry trends toward frameworks, platforms, and
"batteries included" solutions. And there's a place for all of that. But there's
also a quiet satisfaction in writing a function that's exactly as big as it needs
to be, no more, and knowing it'll work unchanged for years.

That's worth writing about. Even if it's just 15 lines.
