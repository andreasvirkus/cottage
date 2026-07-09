---
title: navigation conversion
description: converting a user's next in-app navigation into a full page load to ship fresh bundles
pubDate: 2026-07-09
tags:
  - javascript
  - learning
---

SPAs have an annoying failure mode: the better your app's UX, the staler your users' JavaScript.

If people never need to reload, some of them will keep a tab open for weeks, keeping whatever bundle loaded at the time. The moment you change an API contract or ship a hotfix, those older sessions can start erroring in ways you can't reproduce (or often forget to test).

We recently shipped a pattern for this at Buffer. I think "Navigation Conversion" is a suitable name for it, and I quite like how invisible it is.

The setup is boring on purpose: the app polls a tiny `version.json` every few minutes, served with a low max-age so the polls collapse at the cache instead of hammering origin. Polling pauses in hidden tabs and stops once an update is found. When the served version differs from the one the session started on, we show a small "Reload to update" notice - all very boilerplate so far.

The interesting part is what happens when the user ignores it. Their next in-app navigation gets converted into a full page load. We let the SPA navigate as normal (URL updates, router does its thing) and then trigger a reload at the destination route. As the user was already context-switching, a full load at that exact moment is close to imperceptible. Nobody gets the rug pulled mid-task.

Two details here that took some iteration.

We deliberately did not intercept link clicks to force native navigation. A capture-phase interceptor fights your framework: it kills React click handlers, misses programmatic navigations, and needs an ever-growing allowlist for modifier keys, `target="_blank"`, downloads and so on. Letting the SPA navigate first and reloading after is a fraction of the code.

There's also a 48-hour session-age backstop with no banner at all. Old tabs just convert on their next navigation. And it's not a `setTimeout`, because browsers throttle those in background tabs. We store the load timestamp and compare it whenever the tab regains focus.

The `version.json` bumps are currently manual and deliberate (although we do have a Vite plugin as well that could potentially run on every build.) A breaking API change gets a mandatory bump, and everything else we mostly leave to the backstop. Prompting users on every deploy would just train them to ignore the reload notice.

The obvious trade-off: there's a brief flash as the SPA transition starts before the reload kicks in, and in-memory state doesn't survive, but our `beforeunload` guards for unsaved work still fire as usual.

And we track every conversion with these triggers, whether that's a notice click, an update navigation, or session age. Which means we now know how long tabs actually live in the wild - I'll hopefully remember to update this article with actual numbers in the future.

What's the oldest tab your app has ever had to deal with?
