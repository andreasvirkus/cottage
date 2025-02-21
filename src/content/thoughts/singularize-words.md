---
title: singularize words
description: native event bus on 12 lines of code
pubDate: 2025-02-21
tags:
  - js
  - snippet
---

I'll keep this short! English, despite its many weird grammar exceptions, has pretty clear-cut pluralisation patterns. We can revert them to get the singular versions:

```js
function singularize(word) {
  const endings = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: 'ze',
    ses: 's',
    xes: 'x',
    es: 'e',
    s: ''
  };

  return word.replace(
    new RegExp(`(${Object.keys(endings).join('|')})$`),
    r => endings[r]
  );
}
```
