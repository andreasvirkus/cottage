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

**Note** <span style="font-size:85%">_This article uses the very technique described. Feel free to `Inspect` along!\
Note that for example purposes, all external links are footnotes, but this shouldn't
be their use case._</span>

I recently found a nifty `:target` trick by [CSS-Tricks](https://www.instagram.com/p/B38OLOjgGPO/)
and decided to play around with the technique. Googling for other footnote techniques,
I stumbled upon a [Sitepoint article](https://www.sitepoint.com/accessible-footnotes-css/)
that uses [CSS counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters). This article is about putting those two techniques together (with a bit of my own flair ontop).

## The `:target` trick

The gist of it is to use regular anchor links (`<a>`) and the browser's ability to scroll
to a matching [fragment ID](https://html.spec.whatwg.org/multipage/browsing-the-web.html#scroll-to-the-fragment-identifier).
We can then highlight the clicked footnote via the
`:target` [CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:target).
This pseudo-class selector matches an element with an `id` matching the URL's fragment.
Imagine that your site has an `/#about-section` anchor. Once a user has clicked on a link
to take them to that anchor, the `:target` selector's styles will be applied.

<section class="foxy-box -padded-m">

<h3 id="demo-target">Demo 👇</h3>

Link to <a href="#target-styles-demo" saber-ignore>Section 42</a> will style it via the `:target` pseudo-class
once clicked.

(Amazing ipsum by [hipsum](https://hipsum.co))\
Lorem ipsum dolor amet schlitz austin 90's banh mi DIY affogato street art banjo. Taxidermy chartreuse ethical kickstarter. Tacos farm-to-table jianbing vinyl pork belly, you probably haven't heard of them chicharrones vegan tofu fixie gluten-free. Keffiyeh next level banjo 90's four dollar toast taiyaki. Vaporware leggings shabby chic quinoa.

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

## The CSS counter

I really like this one, as I rarely see a great use for CSS counters outside
lists and I always find them super nifty! I find that counters make perfect sense
for footnotes and they almost seem made to fit for this very purpose.

We are assigning an `aria-describedby` attribute to our footnote references
and then assigning our CSS counter to that. Free accessibility bonus!
We then display the counter value in a pseudo-element, since a pseudo-element's
`content` property can access the counter and display its value.

<section class="foxy-box -padded-m">

  <h3 id="demo-counter">Demo 👇</h3>

  <a aria-describedby="footnote-label" href="#footnotes">Some footnote</a> and words.

  Whatever hella wayfarers kombucha. Hammock butcher hoodie, 90's swag crucifix enamel pin chambray master cleanse brooklyn viral gluten-free.
  <a aria-describedby="footnote-label" href="#footnotes">Biodiesel</a> jean shorts chartreuse, schlitz pitchfork try-hard
  <a aria-describedby="footnote-label" href="#footnotes">offal</a> lyft cloud bread. Wayfarers direct trade listicle, actually synth af cred tousled edison bulb
  <a aria-describedby="footnote-label" href="#footnotes">meditation</a> brooklyn pug. Single-origin coffee live-edge microdosing tbh truffaut ethical, disrupt bicycle rights. Distillery cred polaroid meditation keffiyeh glossier. Meh lo-fi deep v hell of authentic.


  <footer>
    footnotes here!
  </footer>
</section>

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
</style>