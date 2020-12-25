<template>
  <div class="theme-container">
    <search-box />
    <theme-toggle />
    <sidebar />
    <slot />
    <page-footer />

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

    <transition appear name="fade" mode="out-in">
      <img v-show="appear" :src="watercolor" :class="$style.watercolor" />
    </transition>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import ThemeToggle from '@/components/ThemeToggle'
import PageFooter from '@/components/PageFooter'
import watercolor from '@/assets/watercolor4.png'

export default {
  name: 'chrome',
  components: {
    Sidebar,
    SearchBox,
    ThemeToggle,
    PageFooter
  },
  data() {
    return {
      watercolor,
      appear: false
    }
  },
  mounted() {
    setTimeout(() => (this.appear = true))
  }
}
</script>

<style module>
.watercolor {
  position: fixed;
  bottom: -30vh;
  right: -25vw;
  z-index: -1;
  user-select: none;
}

:root[data-theme='light'] .watercolor {
  filter: opacity(0.4);
}
</style>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s cubic-bezier(0.84, -0.43, 0.14, 0.82);
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
