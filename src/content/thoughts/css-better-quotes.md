---
title: 'CSS: Better Quotes'

description: Get your quotes in order!
pubDate: 2023-12-07
tags:
  - typography
  - css
---

Although the naming is inconsistent, similarly to `<code>` and `<pre>`, HTML also provides us both a block-level quote (you guessed it, `<blockquote>`) and also an inline version – `<q>` ([read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)).

What makes the inline quotation element useful, is that CSS allows us to target its quotes with pseudo-selectors:

```css
q {
  quotes: "“" "”" "‘" "’";
}
q::before {
    content: open-quote;
}
q::after {
    content: close-quote;
}
```

<q>My work here is 'done'.</q>

The second pair of characters (optional) that we define in the `quotes` property allows us to dictate which symbols are used in a nested-quote scenario. The nested quote has to be another `<q>` element.
And the symbols can be anything! Check this out for some silly-points

```css
q.example1 { quotes: "👉" "👈" "🥕" "🥕"; }
q.example2 { quotes: "«" "»" "‹" "›"; }
```

<div>
  <style>
  q.example1 { quotes: "👉" "👈" "🥕" "🥕"; }
  q.example2 { quotes: "«" "»" "‹" "›"; }
  </style>

  <p><q class=example1>Last week's highlight was my time debugging <q class=example1>Rabbit MQ</q></q></p>
  <p><q class=example2>Last week's highlight was my time debugging <q class=example2>Rabbit MQ</q></q></p>
</div>

If quotes are set to auto, the quotation marks are dependent on the site's dictated language (slightly varies by browser). A thing I was unaware of is that you can define the language also for a specific element, and browsers will usually get the quotes right:

```html
<ul>
  <style>q { quotes: auto }</style>
  <li lang="fr">
    <q>Ceci est une citation française.</q>
  </li>
  <li lang="ru">
    <q>Это русская цитата</q>
  </li>
  <li lang="de">
    <q>Dies ist ein deutsches Zitat</q>
  </li>
  <li lang="en">
    <q>This is an English quote.</q>
  </li>
</ul>
```

<ul>
  <style>q { quotes: auto }</style>
  <li lang="fr">
    <q>Ceci est une citation française.</q>
  </li>
  <li lang="ru">
    <q>Это русская цитата</q>
  </li>
  <li lang="de">
    <q>Dies ist ein deutsches Zitat</q>
  </li>
  <li lang="en">
    <q>This is an English quote.</q>
  </li>
</ul>

You can read more about it here: [MDN CSS/quotes](https://developer.mozilla.org/en-US/docs/Web/CSS/quotes)

