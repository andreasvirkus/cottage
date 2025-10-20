---
title: 'exhaustive switch statements'
description: Ensure your switch statements leave no branch behind
pubDate: 2025-10-20
tags:
  - typescript
  - snippet
---

Imagine for a second that you've got some code to handle various expected input types.
If those types are known ahead of time, you might swing for an enum. And if you're already using enums,
a switch statement is often oh-so-readable, thus maybe ending up with...

```ts
enum Color {
  Red,
  Green,
  Blue,
}

function getColorName(c: Color): string {
  switch (c) {
    case Color.Red:
      return 'red'
    case Color.Green:
      return 'green'
    // Oops, we forgot about Blue
  }

  throw new Error('Did not expect to be here')
}
```

Now while this behaves as expected and will throw at runtime, wouldn't it be sweeter to catch those _rhythmic blues_
already during your typecheck? We can do that by providing a default case, for example

```ts
enum Color {
  Red,
  Green,
  Blue,
}

export function exhaustiveCheck(value: never): never {
  throw new Error(`Should not be reached: ${value}`)
}

function getColorName(c: Color): string {
  switch (c) {
    case Color.Red:
      return 'red'
    case Color.Green:
      return 'green'
    default:
      exhaustiveCheck(c)
  }
}
```

And there you have it; happy exhaustive type checking!
