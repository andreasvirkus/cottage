---
title: emoji flags from country codes

description: generate the respective flag of any country code
publishedAt: 2025-01-19
---

Here's a nifty snippet to automatically calculate the expected flag emoji of any country,
based on its country code

```ts
const getFlagEmoji = (countryCode) => countryCode
  .toUpperCase()
  .split('')
  .map((char) =>  String.fromCodePoint(127397 + char.charCodeAt()))

// A slightly faster version (https://jsperf.app/peluko)
function getFlagEmoji(countryCode) {
  return [...countryCode.toUpperCase()]
    .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
    .reduce((a, b) => `${a}${b}`);
}
```

Any flag emoji is actually just a combination of its country code's two unicode characters. For instance, with Switzerland, we would need the characters `CH`, which would be `127464` and `127469`.

Breakdown of the "fabrication process": we can get the UTF-16 code index from any character using `charCodeAt`. The UTF-16 `A` is positioned at 65, and we have subtracted this from the region A character index `127462`, resulting in the hardcoded `127397` value (127462 - 65). To get the correct flag emoji index, we simply add the resulting index.\
We then use [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) to return an emoji character for the computed unicode points.

You can test it out in your console on this page!

```ts
getFlagEmoji('SE') // 🇸🇪
getFlagEmoji('dk') // 🇩🇰
getFlagEmoji('ee') // 🇪🇪
``

<script>
window.shorter = (countryCode) => countryCode
  .toUpperCase()
  .split('')
  .map((char) =>  String.fromCodePoint(127397 + char.charCodeAt()))

window.getFlagEmoji = function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) =>  127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}
</script>
