---
title: 'fuzzy svg filters'

description: Fuzzy up your images
pubDate: 2020-02-17
tags:
  - snippet
  - css
  - svg
---

This is another quick one. I'll share a reusable SVG filter, since a couple
of you have asked about how I've achieved the fuzzy hover effect that you
can see when you hover the social icons in the bottom right corner
(sorry mobile users 🤷‍♀️).

First, it's best if we declare the SVG itself with a handful of filter
declarations somewhere before usage, so it'd be declared once and
referenced globally later (so just dump it into the root of your app
or straight into your `<body>` tag).

```html
<svg class="fuzzy-filters">
  <filter id="turbulence-1">
    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
  </filter>

  <filter id="turbulence-2">
    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" />
    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="7" />
  </filter>

  <filter id="turbulence-3">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" />
    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
  </filter>

  <filter id="turbulence-4">
    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" />
    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="4" />
  </filter>

  <filter id="turbulence-5">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" />
    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="3" />
  </filter>
</svg>
```

> Codrops has an [excellent article](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)
> on SVG's turbulence maps and fractal noise, so I would suggest you go
> read that if you're knowledge-hungry (but even they mention that it's best
> to visually play around with the values, rather than to dive deep and understand
> the inner workings of a [Perlin Turbulence function](https://en.wikipedia.org/wiki/Perlin_noise)).

And now we can apply the filters with CSS:

```css
/* Cycle through the filters */
@keyframes fuzzy {
  0% {
    filter: url('#turbulence-1');
  }
  25% {
    filter: url('#turbulence-2');
  }
  50% {
    filter: url('#turbulence-3');
  }
  75% {
    filter: url('#turbulence-4');
  }
  100% {
    filter: url('#turbulence-5');
  }
}
/* Apply the animation, play around with the values here to your liking */
.fuzzy-interact:hover {
  cursor: pointer;
  animation: fuzzy 0.6s linear infinite alternate;
}
/* Here we make the inline SVG non-interactable and not take up any space */
.fuzzy-filters {
  position: fixed;
  pointer-events: none;
}
```

<div class="fuzzy-interact">Hover me for an example</div>

<div>And it works on <em>any</em> content:
  <button type="button" class="foxy-box fuzzy-interact -padded-m">Fuzzy Button 🐨</button>
</div>

**Edit**: I also found a very clever use of this technique by Lucas Bebber: [Squiggly Text](https://codepen.io/lbebber/pen/KwGEQv) on CodePen, that I feel is worth highlighting!
