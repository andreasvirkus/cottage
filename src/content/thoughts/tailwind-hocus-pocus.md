---
title: tailwind hocus-pocus
description: a handy tailwind plugin for focus styles
pubDate: 2024-12-13
tags:
  - tailwind
---

Here's a simple Tailwind plugin that's become a staple of mine as of late.
A cheap way to always get accessible focus styles that just piggyback on your hover styles.

```ts
plugins: [
  plugin(function ({ addVariant }) {
    addVariant('hocus', ['&:hover', '&:focus'])
    addVariant('group-hocus', ['.group:hover &', '.group:focus &'])
  }),
]
```
