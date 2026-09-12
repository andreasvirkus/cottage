---
title: building a turbolinks of my own

description: on client-side navigation, a detour through Astro's built-in router, and actually measuring the difference instead of guessing
pubDate: 2026-09-08
draft: true
tags:
  - javascript
  - learning
---

This site plays a little sound on click - nav links, post cards, the theme picker, all of it (I wrote about [building the sound effects](/thoughts/make-the-web-sing) a while back). The problem was that clicking a link that also navigated somewhere would cut the sound off mid-note, because the browser tears the whole page down for a full reload, and whatever `Audio` element was mid-clip goes with it.

Stop reloading and that problem mostly solves itself: swap out `<main>`, keep the document alive, and the sound just finishes, like a normal sound would. So I built exactly that. Fetch the destination, lift out its `<main>`, swap it in, wrap the swap in the native View Transitions API, update the URL with `pushState`. About 170 lines, no dependencies, and I was fairly pleased with myself about it.

Partway through, it occurred to me that Astro already ships `<ClientRouter />` for this. Fetch, morph, swap, don't reload - the exact same fix, in one line, already installed. It hadn't been doing anything because the old click handler called `event.preventDefault()` and then forced a hard `location.href` navigation 350ms later, which stomps over whatever soft navigation ClientRouter had already started.

So did I actually need to build anything? Going back through what I'd told myself while building the custom version, most of it didn't hold up. I'd assumed the per-page CSS setup here (this site inlines all its styles per page rather than sharing one file) would trip up a generic solution, but Astro's own docs say ClientRouter already reconciles stylesheets on swap, specifically to avoid a flash of unstyled content. I'd also hit a script-only-runs-once bug on `/theme-builder` and figured I'd introduced it myself, except it's Astro's documented behavior too, for the same reason: bundled module scripts only execute once per browser session, no matter who's swapping the DOM. Most of the gotchas I'd worked around already had a name and a fix upstream.

So I ripped the custom router back out, added `<ClientRouter />`, and added `transition:persist` to `<header>` and `<footer>` so their scripts (the theme picker, the mute button) wouldn't go dead on the first navigation - same script-only-runs-once problem, solved Astro's way this time instead of mine.

And it worked well. Sounds finished. The shared-element transition between a post card and its article, which I assumed I'd lose, kept working too, because `transition:name` just compiles down to a `view-transition-name` CSS rule, and the browser's View Transitions API honors that regardless of who's driving the navigation. Turns out I hadn't broken anything by pulling out my own runtime, I'd just stopped throwing away CSS that was already doing the work.

Then it felt slower. Not broken, just a beat behind where the custom version had been. Which is a bad basis for a decision, because "feels slower" is wrong about as often as it's right, and I didn't want to write a blog post on a hunch I hadn't checked.

## measuring it instead of guessing

So I benchmarked both. Headless Brave, driven by Playwright, clicking through the same twenty article pages on the same build, timing each navigation.

My first attempt at this was wrong, and wrong in a way I only caught by going and reading Astro's actual router source. I'd listened for each system's own "I'm done" event - `cottage:navigate` for mine, `astro:page-load` for Astro's - and timed from click to there. Astro came out at 45ms, mine at 280ms. That's not a real result. `astro:page-load` fires as soon as the DOM is patched and scripts are re-run, before the view transition's crossfade has actually finished playing. Mine explicitly waits for `.finished` before saying it's done. I'd built a benchmark that just measured which system talks first, not which one is faster.

Fixed it by not trusting either framework's self-report, and instead wrapping the one thing that means the same thing for both: the browser's own view transition, before either router's code even runs.

```js
const native = document.startViewTransition.bind(document)
document.startViewTransition = (cb) => {
  const vt = native(cb)
  vt.finished.then(() => {
    // record performance.now() - clickTimestamp here
  })
  return vt
}
```

Twenty navigations to pages I hadn't visited yet this session ("cold"), and eighteen repeat navigations between two already-visited pages ("warm"), median milliseconds from click to that transition actually finishing:

| | cold | warm |
|---|---|---|
| custom router | 278.5ms | 265.2ms |
| Astro ClientRouter | 305.8ms | 305.3ms |

The warm numbers don't overlap at all - custom router samples clustered 263-274ms, ClientRouter's 290-314ms, every time. ClientRouter's cold and warm numbers are also basically the same, because it has no notion of a page it's already seen; it re-fetches and re-parses every time. Mine gets faster on a repeat visit because the cache just skips the fetch.

None of this is "ClientRouter waits for the sound to finish" - which is the story I went in half-expecting. Nothing in either implementation blocks on audio. What's actually happening is smaller: ClientRouter does more work on every navigation - more lifecycle events, rescanning and replaying every script tag, preloading stylesheet links - and that adds up to something like 30-40ms on top of the ~250ms both versions spend on the view transition itself.

## keeping the smaller one

So the custom router stays, though not because Astro's is broken. Most of what I assumed would be hard about a generic solution is already handled, well, upstream. But for this one page swap, with a cache that pays off on repeat visits and none of the general-purpose bookkeeping I don't need, the numbers land on the smaller version.

Which is a slightly embarrassing thing to admit went into a blog post as a hunch first. If you've got a cleaner way to fake View Transition parity checks across two frameworks that isn't "monkey-patch the platform API and hope," I'd genuinely like to hear it.
