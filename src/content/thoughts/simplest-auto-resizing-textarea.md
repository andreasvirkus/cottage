---
title: simplest auto-resizing textarea
description: auto-resize a textarea without any JS or extra elements
pubDate: 2024-10-26
draft: true
tags:
  - css
---

A simple snippet where we utilise a pseudo-element and the `content: attr(data-value)` to grab the
textarea's value, to shadow its contents and get multiline functionality.

```css
.textareaWrapper {
  display: grid;
  width: 100%;

  &:after {
    content: attr(data-value) " ";
    white-space: pre-wrap;
    visibility: hidden;
    max-width: 100%;
    padding-bottom: 5px;
    line-height: normal;
  }

  & > textarea {
    resize: none;
    overflow: hidden;
  }

  & > textarea,
  &::after {
    grid-area: 1 / 1 / 2 / 2;
    resize: none;
    flex-grow: 1;
    margin: 0;
    padding: 16px;
    max-width: 100%;
    border: 1px solid tomato;
    border-radius: 4px;
    font-size: 20px;
    background: none;
  }
}
```
