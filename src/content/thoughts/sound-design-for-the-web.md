---
title: sound design for the web

description: going beyond the click - why and how to add audio to web experiences
pubDate: 2026-02-25
draft: true
tags:
  - javascript
  - audio
---

A while back, I wrote about [making the web sing](/thoughts/make-the-web-sing) — recording
your own sounds and playing them with a simple utility. That post was about the _how_.
This one's about the _why_, the _when_, and going a bit deeper into what the browser
actually gives us for working with audio.

## The case for sound on the web

Sound on the web has a bad reputation, and honestly, it's deserved. Autoplaying music,
notification sounds on every single action, video ads blasting at full volume — we've been
conditioned to reach for the mute button. But that's not a problem with sound itself.
That's a problem with _bad_ sound design.

Good sound is invisible until you notice its absence. Think about the satisfying _pop_
when you send an iMessage. The subtle _whoosh_ when you swipe to archive an email. The
soft _click_ when toggling a switch in your phone's settings. These aren't distractions.
They're feedback. They tell you "something happened" in a way that's faster than any
visual animation.

The web has largely ignored this dimension. But there's no reason it should.

## When sound makes sense

Not every website needs sound, but some experiences are genuinely better with it:

- **Interactions that need confirmation** — a form submission, a successful payment, a completed action.
  A sound confirms the action even if the user isn't looking at the screen.
- **Delightful moments** — easter eggs, celebrations (confetti _with_ a pop sound hits different),
  game-like interactions, playful transitions.
- **Accessibility** — screen readers handle text, but custom audio cues can enhance
  spatial navigation and state changes for all users.
- **Demos and presentations** — this is actually how I got into it. 20 minutes before
  presenting a project, I recorded some mouth sounds and it completely changed the vibe.

The rule of thumb: sound should _reinforce_, not _replace_ or _compete with_ the visual interface.

## The Web Audio API

For the simple use case of "play this sound file when the user clicks a button,"
`HTMLAudioElement` (i.e., `new Audio()`) is perfectly fine — I covered this in my
[previous post](/thoughts/make-the-web-sing). But if you want more control, the
Web Audio API opens up a world of possibilities.

The core concept is an **audio graph** — a chain of nodes that audio flows through.
At one end, you have a source (a file, a microphone, or even generated tones).
At the other end, you have the destination (usually your speakers). In between,
you can add nodes that process the audio: gain (volume), filters, panning, delay, reverb.

```js
const ctx = new AudioContext()

// Load a sound file
const response = await fetch('/sounds/boop.m4a')
const buffer = await ctx.decodeAudioData(await response.arrayBuffer())

// Create and connect nodes
const source = ctx.createBufferSource()
source.buffer = buffer

const gainNode = ctx.createGain()
gainNode.gain.value = 0.6

source.connect(gainNode)
gainNode.connect(ctx.destination)

source.start()
```

It's more verbose than `new Audio().play()`, but you get individual control over
every aspect of the sound.

## Spatial audio with the panner

One of my favourite Web Audio API features is `PannerNode`, which lets you position
sounds in 3D space. Imagine a notification that _sounds_ like it's coming from the
top-right corner where the notification badge lives. Or a game where footsteps pan
from left to right as a character crosses the screen.

```js
const panner = ctx.createPanner()
panner.panningModel = 'HRTF' // head-related transfer function, fancy!
panner.setPosition(1, 0, 0) // right side

source.connect(panner)
panner.connect(ctx.destination)
```

It's worth noting that `HRTF` panning genuinely sounds _spatial_ with headphones.
Without headphones, it's still a left-right pan, but the HRTF model adds a subtle
verticality that's impressive for a browser API.

## Generating sounds (no files needed)

You don't even need sound files. The Web Audio API can generate tones from scratch
using `OscillatorNode`:

```js
const oscillator = ctx.createOscillator()
oscillator.type = 'sine' // also 'square', 'sawtooth', 'triangle'
oscillator.frequency.value = 440 // A4 note

oscillator.connect(ctx.destination)
oscillator.start()
oscillator.stop(ctx.currentTime + 0.2) // play for 200ms
```

Combine a few oscillators with different frequencies and envelopes and you can create
surprisingly satisfying UI sounds without loading a single audio file. Think chip-tune
confirmation sounds, gentle notification pings, or error buzzes.

## Respecting the user

A few hard rules:

1. **Never autoplay sound.** Browsers will block it anyway (thanks, Chrome's autoplay policy),
   but even if you could, don't.
2. **Provide a mute toggle** if your site uses sound beyond a single interaction.
   Persist the preference. Respect it everywhere.
3. **Keep volumes modest.** My go-to is `0.4–0.6` for UI sounds. The user's system volume
   is already set to their preference — don't blast through it.
4. **Sound should be additive.** The experience should work perfectly fine without sound.
   It's seasoning, not the meal.

## Getting started

If you want to experiment, start small. Pick one interaction on your site — maybe a button
click or a theme toggle — and add a subtle sound to it. Record it with your mouth
(seriously, it's charming), or generate it with an oscillator. See how it feels.

You might be surprised how much personality a single _boop_ can add.
