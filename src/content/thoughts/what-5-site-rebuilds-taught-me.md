---
title: what 5 site rebuilds taught me

description: from metalsmith to astro and all the yak shaving in between
pubDate: 2026-02-25
draft: true
tags:
  - learning
---

I've rebuilt my personal site five times. Not five redesigns — five full rewrites with different
static site generators. Metalsmith, Vuepress, Eleventy, Saber, and now Astro. Each time I was
convinced that _this_ was the one. Each time I learned something, though not always
what I expected.

## Metalsmith (2017)

My first SSG. I picked it because it was JavaScript (not Ruby like Jekyll) and because its
plugin architecture clicked with me immediately. Everything was a plugin. Want Markdown?
Plugin. Want Sass? Plugin. Want to generate a podcast RSS feed? I'll write that plugin myself,
thank you very much.

Metalsmith taught me the joy of running JavaScript outside the browser for the first time.
I remember that feeling vividly — the raw power of the filesystem being at your disposal.
I fell head-over-heels in love with programming all over again.

**What it taught me:** Build tools are just functions that transform files. There's no magic.
Once you understand that, the whole ecosystem becomes less intimidating.

**Why I left:** The config grew unwieldy. Build times ballooned. Adding turbolinks for page
transitions worked but felt like duct tape on a house of cards. After avoiding updating my
site for over a year, I knew it was time.

## Vuepress (2018)

When Vuepress was announced, I lost it. Vue + Markdown + static generation? Sign me up.
I immediately jumped on the early beta and rewrote everything.

It was not a great fit. Vuepress was built for documentation sites, and bending it into
a blog meant fighting the tool more than using it. The defaults were opinionated in ways
that didn't match my needs, and customizing meant understanding internals I didn't care about.

**What it taught me:** A tool's intended use case matters more than its underlying technology.
Loving Vue didn't make Vuepress right for a blog. That seems obvious in hindsight,
but I had to learn it the hard way.

**Why I left:** Square peg, round hole.

## Eleventy (2018–2019)

Eleventy was the anti-framework. Zero client-side JavaScript by default. Bring your own
templating language. Minimal opinions. Maximum flexibility.

I respected it immensely but never fully bonded with it. The flexibility that made it
powerful also meant more decisions to make. Which template language? How to structure layouts?
Every project felt like starting from scratch.

**What it taught me:** Sometimes "unopinionated" just means the opinions are yours to make,
and that's its own kind of overhead. Freedom and friction can be the same thing.

**Why I left:** Saber came along and it was _exactly_ what I wanted.

## Saber (2019–2023)

Saber was what Vuepress should have been for my use case. Vue-powered, blog-aware,
with sensible defaults and room to customize. I genuinely loved it. I wrote more posts
during the Saber era than any other.

**What it taught me:** The best tool is the one that gets out of your way. I wasn't thinking
about the framework; I was thinking about what to write. That's the sweet spot.

**Why I left:** The project's development slowed and eventually stopped. Which brings us
to the uncomfortable truth about betting on smaller projects.

## Astro (2023–present)

Astro is the first SSG where I feel like I might actually stay. It has opinions
but they're _my_ opinions: ship zero JS by default, use whatever UI framework you want
(or none), treat content as a first-class concern.

The content collections API, the island architecture, the build performance — it all
just works. And it has enough momentum behind it that I'm not worried about
it disappearing.

**What it taught me:** Maturity matters. Not just in the tool, but in me. I'm no longer
chasing the newest thing. I want something stable, maintained, and aligned with how I
think about the web.

## The meta-lesson

Five rebuilds, and what do I have to show for it? A blog with ~40 posts that could've been
built with literally any of these tools. The content is what matters. The tool is just
the vehicle.

But I don't regret the rebuilds. Each one taught me something real — about build tools,
about my own preferences, about the difference between _needing_ to switch and _wanting_ to.
The yak shaving was its own form of learning.

If I had to distill it into advice:

1. **Pick a tool that matches your use case**, not your favourite framework
2. **Bet on active communities** over clever architecture
3. **The best time to stop rebuilding is when you start writing more than configuring**
4. **Your content will outlive every tool you pick**, so make it portable (hello, Markdown)

And if you're on your third rebuild and feeling a bit guilty about it — don't. You're learning.
Just maybe write a blog post about it while you're at it.
