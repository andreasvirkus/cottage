<template>
  <div class="theme-container">
    <search-box/>
    <sidebar/>
    <slot/>

    <button @click="toggleTheme"
      class="theme__switcher"></button>
    <div class="theme__overlay"></div>
    <page-footer/>
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
  },
  methods: {
    toggleTheme () {
      console.log('switching theme')
      document.documentElement.classList.toggle('-dark')
    }
  }
}
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity .2s cubic-bezier(.84,-0.43,.14,.82);
}
.page-enter, .page-leave-to {
  opacity: 0;
}
.theme__switcher,
.theme__overlay {
  position: fixed;
  top: -1.05rem;
  right: -1.05rem;
  width: 4rem;
  height: 4rem;
  border: none;
}
.theme__switcher {
  background-color: #223;
  border-right: 4px solid #223;
  border-left: 4px solid #223;
  transform: rotate(45deg);
  z-index: 6;
}
.theme__overlay {
  z-index: 9;
  transform: scale(0);
  border-radius: 50%;
  pointer-events: none;
  transition: transform .3s ease-out;
  mix-blend-mode: exclusion;
  background-color: #efefef;
}
:root.-dark .theme__overlay {
  transform: scale(140);
}
</style>
