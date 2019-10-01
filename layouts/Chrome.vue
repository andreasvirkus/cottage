<template>
  <div class="theme-container">
    <search-box/>
    <sidebar/>
    <slot/>
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
</style>
