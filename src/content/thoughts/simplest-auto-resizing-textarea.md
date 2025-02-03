---
title: simplest auto-resizing textarea
description: auto-resize a textarea without any JS or extra elements
pubDate: 2024-10-26
tags:
  - css
---

A simple snippet where we utilise a pseudo-element and the `content: attr(data-replicated-value)` to grab the
textarea's value, to shadow its contents and get multiline functionality.

```css
.textareaWrapper {
  --border-width: 1px;
  display: grid;
  max-height: inherit;

  &::after {
    content: attr(data-replicated-value) ' ';
    border: var(--border-width) solid transparent;
    white-space: pre-wrap;
    visibility: hidden;
  }

  .textArea {
    resize: none;
    color: inherit;
  }

  .textArea,
  &::after {
    box-sizing: border-box;
    font: inherit;
    font-size: inherit;
    max-height: inherit;
    grid-area: 1 / 1 / 2 / 2;
    width: 100%;
    padding: 0.25rem;
    margin: 0;
    overflow: auto;
    scrollbar-gutter: stable;
  }
}
```
