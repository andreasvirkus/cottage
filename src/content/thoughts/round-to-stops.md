---
title: round to stops
description: rounding method with custom increments
pubDate: 2025-02-22
tags:
  - javascript
---


```ts
const roundingStops = [5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000]

const roundToScale = (count, scale = roundingStops) => {
  if (count === 0) return 0

  const nearestIdx = scale.findIndex((s) => s > count)
  let nearest = scale[nearestIdx]
  if (nearestIdx !== 0 && nearest / 2 > count) nearest = scale[nearestIdx - 1] || scale[0]

  return nearest || count
}
```