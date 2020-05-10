<template>
  <div class="theme-container">
    <search-box />
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
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'chrome',
  components: {
    Sidebar,
    SearchBox,
    PageFooter
  }
}
</script>

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
