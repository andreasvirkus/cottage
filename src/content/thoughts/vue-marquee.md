---
title: vue marquee
description: bring back the magic of retro web design
pubDate: 2024-10-28
tags:
  - til
  - vue
---

Here's a simple Vue component for Marquee text, because I'm not willing to let go of [`<marquee>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee) just yet.

```html
<template>
  <div :class="$style.wrap">
    <div :class="[$style.content, paused && $style.paused]">
      <div
        v-for="idx in repeat"
        :key="idx"
        :class="$style.text"
        :style="{
          animationDuration: `${duration}s`,
          animationDirection: reverse
            ? 'reverse'
            : undefined,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarqueeSlider',
  props: {
    duration: {
      type: Number,
      default: 15,
    },
    repeat: {
      type: Number,
      default: 3,
      validator(val) {
        return val > 0
      },
    },
    paused: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style module>
.wrap {
  --gap: 48px;
  overflow: hidden;
}

.content {
  display: flex;
  gap: var(--gap);
  width: 100000px;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: var(--gap);
  animation-name: animation;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  float: left;
}

.paused .text {
  animation-play-state: paused
}

@keyframes animation {
  0% { transform:translateX(0); }
  100% { transform:translateX(-100%); }
}
</style>
```
