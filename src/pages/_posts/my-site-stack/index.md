---
title: my site stack
layout: Post
description: what this shindig consists of
date: 2017-09-03
tags:
  - learning
---

<span style="font-size:85%">**Note**: This article has been updated throughout time,
with its latest edit in November 2019</span>

I feel like this is the `Hello World!` post for every/any developer
who's managed to set up a blog with a static-site generator. Since
I'm an avid [generator-hopper](/thoughts/generator-hopping), I've
broken this post down to different eras:

- [...static sites?](#static-sites)
  - [Metalsmith](#metalsmith)
  - [Vuepress](#vuepress)
  - [Eleventy](#eleventy)
  - [Saber](#saber)

But first...

## ...static sites?

I'm an avid advocate of [KISS](https://en.wikipedia.org/wiki/KISS_principle#In_software_development)
and that should also apply to your tech stack. Now, that doesn't have to
mean that you wear a tinfoil hat and command people to FTP files labelled
`index-old-old-old.html` to your production server. But it _does_ mean
doing away with the technical overhead that your stack might be haunted by.

A great place to usually start is your project's/company's public website. Or
a (marketing?) landing page you manage. Or even a complex app, because nowadays
you can [JAM](https://jamstack.wtf/)-ify anything.

Since I really do love the JAM stack (and alongside it, anything static-first or
progressively enhanced), I feel it's my duty to quickly sell you on some benefits.

- _Time to Interactive_ (or at least perceived) performance gains
- Less expensive, if not free (👋 Netlify!)
- A robust stack that doesn't confuse you 6 months later
- `Host-it-and-forget-it`, which is especially nice for a typical devloper's or
  designer's portfolio/CV sites
- Maybe a sense of pride, knowing that your site is not just human-friendly,
  but also accessible to a wide range of readers/parsers? 🤖

### Metalsmith

This was my first hands-on experience with a [SSG](https://www.staticgen.com/).
I had looked and fiddled with Jekyll before, but to me it wasn't really approachable
or hackable, since (being a simple front-end developer then) Ruby was rather foreign to me.
But Metalsmith _clicked_. It was _simple enough_ out-of-the-box and had a whole
universe of possibilities circling around it with its rich plugin ecosystem.
I also really liked how it taught you from the getgo to write plugins on your own
and there really was no magic to it. I have even published one
[on my own](https://github.com/andreasvirkus/metalsmith-podcast).

Metalsmith was actually my first step into the magical world of running JavaScript outside
of the browser. I remember feeling such power and enthusiasm. It was truly me
falling head-over-heels in love with programming all over again.

But as with most relationships, time changes its parties. As my Metalsmith config grew,
so did the build times. And it was a bit limiting on the browser side. Adding turbolinks
and messing with page transitions ultimately worked to achieve my goal, but at a
hefty cost. After avoiding updating my home page for a bit over a year, Metalsmith
didn't pass my `Do you get what's going on in this pigsty?` test.

### Vuepress

When Vuepress was announced, I went bonkers for it. I immediately hopped on the early beta release
and refactored my whole repo.

It was not a great fit though. More on this later.

### Eleventy

More on this soon.

### Saber

I currently use (and love!) Saber. It strikes a perfect balance in easy setup and
what it can achieve as a framework. I cannot wait for it to mature even further
(given how young the project is). _Definitely more_ on this Soon™.

---

Bonus round:

- The awesome-sauce that is Netlify
- Building a JAM stack (this site really isn't one, but we'll talk a bit about what a JAM stack is)
- Stuff other similar posts don't usually mention
  - Service workers and are they worth it on a static site?
  - Generating a sitemap, RSS feed and other tidbits
  - Adding a CMS ([Netlify-CMS](https://github.com/netlify/netlify-cms))
