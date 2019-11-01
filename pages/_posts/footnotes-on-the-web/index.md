---
title: footnotes on the web
layout: Post
description: Referencing footnotes properly with only HTML & CSS
date: 2019-10-28
draft: true
tags:
  - til
  - css

#TODO:
#- Change all references for footnotes in this article
---

**Note** <span style="font-size:85%">_This article uses the very technique described.
  Feel free to <a aria-describedby="footnote-label"
  id="note-ref-inspect"
  href="#note-inspect"
  saber-ignore><code>Inspect</code></a> along!_</span>

I recently found a nifty
<a aria-describedby="footnote-label"
  id="note-ref-target-pseudo-class"
  href="#note-target-pseudo-class"
  saber-ignore>`:target`</a>
trick by [CSS-Tricks](https://www.instagram.com/p/B38OLOjgGPO/)
and decided to play around with the technique. Googling for other footnote techniques,
I stumbled upon a [Sitepoint article](https://www.sitepoint.com/accessible-footnotes-css/)
that uses
<a aria-describedby="footnote-label"
  id="note-ref-css-counters"
  href="#note-css-counters"
  saber-ignore>CSS counters</a>.
This article is about putting those two techniques together (with a bit of my own flair ontop).

## 1. The `:target` trick

The gist of it is to use regular anchor links (`<a>`) and the browser's ability to scroll
to a matching [fragment ID](https://html.spec.whatwg.org/multipage/browsing-the-web.html#scroll-to-the-fragment-identifier).
We can then highlight the clicked footnote via the
`:target` [CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:target).
This pseudo-class selector matches an element with an `id` matching the URL's fragment.
Imagine that your site has an `/#about-section` anchor. Once a user has clicked on a link
to take them to that anchor, the `:target` selector's styles will be applied.

<section class="foxy-box -padded-m">

<h3 id="demo-target">Demo 👇</h3>

Link to <a href="#target-styles-demo" saber-ignore>Section 42</a> will
style it via the `:target` pseudo-class once clicked.

```css
#target-styles-demo:target {
  background-color: cornflowerblue;
  color: white;
}
```

<p id="target-styles-demo"><strong>[Section 42]</strong></p>

<a href="#demo-target" saber-ignore>Reset the demo</a>

</section>

<style>
  #target-styles-demo:target {
    background-color: cornflowerblue;
    color: white;
  }
</style>

We can then leverage this "active fragment" styling to highlight the relevant footnote.

## 2. The CSS counter

I really like this one, as I rarely see a great use-case for CSS counters outside
lists and I always find them super nifty! I find that counters make perfect sense
for footnotes and they almost seem made to fit for this very purpose.

We are assigning an `aria-describedby` attribute to our footnote references
and then assigning our CSS counter to that. Free accessibility bonus!
We then display the counter value in a pseudo-element, since a pseudo-element's
`content` property can access the counter and display its value.

```css
/* Let's create a counter on a wrapper element */
article {
  counter-reset: footnotes;
}
/* Here we increment the counter for every footnote reference */
a[aria-describedby="footnote-label"] {
  counter-increment: footnotes;
  text-decoration: none;
  color: inherit;
  outline: none;
}
/**
 * Actual numbered references
 * 1. Display the current state of the counter (e.g. `[1]`)
 * 2. Style text as superscript
 */
a[aria-describedby="footnote-label"]::after {
  content: '[' counter(footnotes) ']';
  vertical-align: super;
  font-size: 0.5em;
  margin-left: 2px;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

a[aria-describedby="footnote-label"]:focus::after {
  outline: thin dotted;
  outline-offset: 2px;
}
```

Here's the HTML for the footnote references we sprinkle into our content
<span style="font-size: 85%">(we give it an `id` so we could link back to it from the footnotes - providing
the user a way to jump back right where they left off)</span>
```html
<a aria-describedby="footnote-label"
  id="note-ref-target-pseudo-class"
  href="#note-target-pseudo-class">Section 42</a>
```

## 3. Indicating active footnote

With almost all the pieces in place, we can now add a touch of magic
so that the user would know what footnote they were taken to (and vice-versa
when throwing them back into content).

If you haven't already experimented, click on
<a aria-describedby="footnote-label"
  id="note-ref-highlight"
  href="#note-highlight"
  saber-ignore>this footnote</a> to see the effect.

```css
/* Inline footnotes */
a[aria-describedby="footnote-label"]:target {
  animation: highlight 3s;
}

/* Wrapper of your footnotes */
footer :target {
  animation: highlight 2.75s;
}

@keyframes highlight {
  from { outline: 10px solid cornflowerblue; }
  to { outline: 10px solid transparent; }
}
```

### Bonus:

I'm including a "back to top" link with every footnote in our footer.

---

## Issues

Turns out SPAs have a hard time with this, since the HTML5 History API's
`pushState()` method does not active the `:target` selector's styles.

## Practicality


---


<footer class="-space-top">
  <em>Footnotes:</em>
  <ol class="footnotes">
    <li id="note-inspect">Right-click > Inspect will open up your browser's
      <a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools">Developer tools</a>
      (<span class="emoji">☝️</span>
      <a href="#note-ref-inspect"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
    <li id="note-target-pseudo-class"><code>:target</code> is a CSS pseudo-class selector -
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:target">MDN docs</a>
      (<span class="emoji">☝️</span>
      <a href="#note-ref-target-pseudo-class"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
    <li id="note-css-counters">CSS counters are custom iterations of list markers
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters">MDN docs</a>
      (<span class="emoji">☝️</span>
      <a href="#note-ref-css-counters"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
    <li id="note-highlight">Well... what do you know? It worked ✨
      (<span class="emoji">☝️</span>
      <a href="#note-ref-highlight"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
  </ol>
</footer>

<style>
article {
  counter-reset: footnotes;
}

a[aria-describedby="footnote-label"] {
  counter-increment: footnotes; /* 1 */
  text-decoration: none;
  color: inherit;
  outline: none;
}
a[aria-describedby="footnote-label"]:target {
  animation: highlight 3s;
}

/**
 * Actual numbered references
 * 1. Display the current state of the counter (e.g. `[1]`)
 * 2. Align text as superscript
 * 3. Make the number smaller (since it's superscript)
 * 4. Slightly offset the number from the text
 * 5. Reset link styles on the number to show it's usable
 */
a[aria-describedby="footnote-label"]::after {
  content: '[' counter(footnotes) ']'; /* 1 */
  vertical-align: super; /* 2 */
  font-size: 0.5em; /* 3 */
  margin-left: 2px; /* 4 */
  color: blue; /* 5 */
  text-decoration: underline; /* 5 */
  cursor: pointer; /* 5 */
}

/**
 * Resetting the default focused styles on the number
 */
a[aria-describedby="footnote-label"]:focus::after {
  outline: thin dotted;
  outline-offset: 2px;
}

.footnotes :target {
  animation: highlight 2.75s;
}

@keyframes highlight {
  from { outline: 10px solid cornflowerblue; }
  to { outline: 10px solid transparent; }
}
</style>