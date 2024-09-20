---
title: translate ordinal suffixes
description: 'Easiest trick for ordinal suffixes with i18n support'
pubDate: 2023-12-04
tags:
  - snippet
  - javascript
---

Another quick one today. Ever needed to dynamically add ordinal suffixes to your numbers? For example make 23 → 23rd or 41 → 41st?

A very common solution that pops up on StackOverflow, and which you can also find in some well-known libraries, e.g. Shopify, is this snippet

```js
export const ordinal = (num) => {
  const suffix = ['th', 'st', 'nd', 'rd']
  const value = val % 100

  return val + (suffix[(value - 20) % 10] || suffix[value] || suffix[0])
}
```

But this doesn't scale that nicely when you want to localize these suffixes. So let's look at the beloved (but maybe not that known) [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API, namely its [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) interface.

```js
const enOrdinalRules = new Intl.PluralRules('en', {type: 'ordinal'})
const suffixes = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th'
}

function ordinal(number: number): string {
    const category = enOrdinalRules.select(number)
    const suffix = suffixes[category]
    return number + suffix
}

const test = Array(201)
  .fill()
  .map((_, idx) => idx - 100)
  .map(ordinal)
  .join(' ')
```

I won't log it all onto the page, but open your Console to see the results! That's all 🖖

<script>
const enOrdinalRules = new Intl.PluralRules('en', {type: 'ordinal'})
const suffixes = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th'
}

function ordinal(number) {
    const category = enOrdinalRules.select(number)
    const suffix = suffixes[category]
    return number + suffix
}

const test = Array(201)
  .fill()
  .map((_, idx) => idx)
  .map(ordinal)
  .join(' ')

console.info(test)
</script>