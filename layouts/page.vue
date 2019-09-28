<template>
  <div class="theme-container">
    <search-box v-if="false"/>
    <sidebar/>

    <main class="content">
      <slot name="default"/>
    </main>

    <page-footer :page="page"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'page',
  props: ['page'],
  components: {
    Sidebar,
    SearchBox,
    PageFooter
  },
  head () {
    const { title, description, excerpt } = this.page
    return {
      title: title
        ? `${title} | ${this.$siteConfig.title}`
        : this.$siteConfig.title,
      meta: [
        {
          name: 'description',
          content: description || excerpt || this.$siteConfig.description
        }
      ]
    }
  }
}
</script>

<style src="../css/variables.css"></style>
<style src="../css/global.css"></style>
<style src="../css/utility.css"></style>
<style>
.page-enter-active, .page-leave-active {
  transition: opacity .2s cubic-bezier(.84,-0.43,.14,.82);
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
