---
title: footnotes on the web

description: Referencing footnotes properly with only HTML & CSS
pubDate: 2019-11-01
tags:
  - css
---

**Note** <span style="font-size:85%">_This article uses the very technique described.
Feel free to <a aria-describedby="footnote-label"
  id="cite-ref-1"
  href="#cite-1"
  saber-ignore><code>Inspect</code></a> along!_</span>

I recently found a nifty
<a aria-describedby="footnote-label"
  id="cite-ref-2"
  href="#cite-2"
  saber-ignore>`:target`</a>
trick by [CSS-Tricks](https://www.instagram.com/p/B38OLOjgGPO/)
and decided to play around with the technique. Googling for other footnote techniques,
I stumbled upon a [Sitepoint article](https://www.sitepoint.com/accessible-footnotes-css/)
that uses
<a aria-describedby="footnote-label"
  id="cite-ref-3"
  href="#cite-3"
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

Some link to an imaginary <a href="#target-styles-demo" saber-ignore>Section 42</a>.
Notice how it will be styled via the `:target` pseudo-class once clicked.

```html
<a href="#target-styles-demo">Section 42</a>

<!-- content... -->

<p id="target-styles-demo">[Section 42]</p>
```

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

The attribute isn't mandatory here. If you wish to save on characters,
you could also apply the counter by any class selector.

```css
/* Let's create a counter on a wrapper element */
article {
  counter-reset: footnotes;
}
/* Here we increment the counter for every footnote reference */
a[aria-describedby='footnote-label'] {
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
a[aria-describedby='footnote-label']::after {
  content: '[' counter(footnotes) ']';
  vertical-align: super;
  font-size: 0.5em;
  margin-left: 2px;
  color: blue;
  text-decoration: underline;
  cursor: var(--cursor-pointer), pointer;
}

a[aria-describedby='footnote-label']:focus::after {
  outline: thin dotted;
  outline-offset: 2px;
}
```

Here's the HTML for the footnote references we sprinkle into our content
<span style="font-size: 85%">(we give it an `id` so we could link back to it from the footnotes - providing
the user a way to jump back right where they left off)</span>

```html
<a aria-describedby="footnote-label" id="cite-ref-1" href="#cite-1">Section 42</a>
```

## 3. Indicating active footnote

With almost all the pieces in place, we can now add a touch of magic
so that the user would know what footnote they were taken to (and vice-versa
when throwing them back into content).

If you haven't already experimented, click on
<a aria-describedby="footnote-label"
  id="cite-ref-4"
  href="#cite-4"
  saber-ignore>this footnote</a> to see the effect.

```css
/* Inline footnotes */
a[aria-describedby='footnote-label']:target {
  animation: highlight 3s;
}

/* Wrapper of your footnotes */
footer :target {
  animation: highlight 2.75s;
}

@keyframes highlight {
  from {
    outline: 10px solid cornflowerblue;
  }
  to {
    outline: 10px solid transparent;
  }
}
```

### Bonus:

I'm including a "back to top" link with every footnote in our footer.
For this to work, we'll also add an ID to the link in the content that
references a footnote. I'm using a [`cite-1`, `cite-ref-1`] convention
here because at first I had long descriptive names per footnote, but
it got cumbersome to

- type them out each time
- try and avoid clashes
- remember what I had just typed when creating the "Back to top" button in the footer

I saw that Wikipedia uses the same for their footnote fragments
(<span style="font-size:85%"><em>without referencing back to the content</em></span>)!
And this will work just as well for GitHub's Markdown preview.

```html
Laa-dee-daa and a <a href="#cite-1" id="cite-ref-1">scientific term</a>.

<!-- ...content -->

<footer>
  <p id="cite-1">Explanation of fancy term. <a href="#cite-ref-1">☝️ Back</a></p>
</footer>
```

## Issues

Turns out SPAs have a hard time with this, since the HTML5 History API's
`pushState()` method does not activate the `:target` selector's styles.

There is also a [reported issue](https://bugs.chromium.org/p/chromium/issues/detail?id=89165) on Chromium
and the behaviour seems consistent across browsers.

Remedies:

- Changing the URL the old-fashioned way (`window.location.href = 'page#some-hash'`) will trigger the styles
- For Vue and React link components (e.g. `<router-link>`), you could add a click listener

```js
<router-link
  to='/page#some-hash'
  @click.native="() => window.location.hash = '#some-hash'"/>
```

If you're using [Saber](https://saber.land) as I am, you can add the
<a aria-describedby="footnote-label"
  href="#cite-5"
  id="cite-ref-5"
  saber-ignore>`saber-ignore`</a> property to your links.

## Practicality

So it _is_ cumbersome to write these in a Markdown file, as you'll need to whip them
up in vanilla HTML every time. You might be able to get away with writing a Vue/React component
for your Static Site Generator, or maybe a Markdown plugin to handle these.

After all, one of Markdown's hyperlink syntaxes is itself a reference mechanism:

```markdown
[Link test][1]

[1]: https://en.wikipedia.org/wiki/Weissman_score
```

So maybe that could be cleverly transformed to Footnotes when the reference is not a valid link? 🤔
Maybe we'll explore that in the future together.

Even with the troublesome DX, I like the academic feel of properly referencing your statements.

If you'd wish to check out the demo code, this whole article is just a single Vue component!
[Browse the source](https://github.com/andreasvirkus/cottage/blob/master/pages/_posts/footnotes-on-the-web/index.md)

---

<footer class="-space-top">
  <em id="footnotes-label">Footnotes:</em>
  <ol class="footnotes">
    <li id="cite-1">Right-click > Inspect will open up your browser's
      <a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools">Developer tools</a>
      (<span class="emoji">☝️</span>
      <a href="#cite-ref-1"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
    <li id="cite-2"><code>:target</code> is a CSS pseudo-class selector -
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:target">MDN docs</a>
      (<span class="emoji">☝️</span>
      <a href="#cite-ref-2"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
    <li id="cite-3">CSS counters are custom iterations of list markers
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters">MDN docs</a>
      (<span class="emoji">☝️</span>
      <a href="#cite-ref-3"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
    <li id="cite-4">Well... what do you know? It worked ✨
      (<span class="emoji">☝️</span>
      <a href="#cite-ref-4"
        aria-label="Back to content"
        saber-ignore>
      back up</a>)
    </li>
    <li id="cite-5">This will tell Saber to not render them as
      <code>&lt;saber-link&gt;</code> components and will make them act as regular ol' anchor elements
      <a href="https://saber.land/docs/routing.html#disable-this-with-saber-ignore">saber-link docs</a>
      (<span class="emoji">☝️</span>
      <a href="#cite-ref-4"
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
