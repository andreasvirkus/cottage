---
title: simple image placeholders
description: loading skeletons with just css
pubDate: 2025-01-29
tags:
  - css
---

Here's a simple way to display loading skeletons for images

```css
.avatar {
  background: #eee;
  animation: pulse 1.5s ease-in-out infinite;

  &[src] {
    animation: none;
    background: none;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
```
