<template>
  <div class="theme-container">
    <search-box/>
    <sidebar/>

    <main class="content">
      <slot name="default"/>

      <posts-list v-if="page.posts" :posts="page.posts"/>
    </main>

    <page-footer :page="page"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import PostsList from '@/components/PostsList'
import SearchBox from '@/components/SearchBox'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'page',
  props: ['page'],
  components: {
    Sidebar,
    PostsList,
    SearchBox,
    PageFooter
  },
  head () {
    const { title, description, excerpt } = this.page
    const defaultTitle = this.$siteConfig.title
    return {
      title: (title && title !== defaultTitle)
        ? `${title} | ${defaultTitle}`
        : defaultTitle,
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

<style>
.page-enter-active .content, .page-leave-active .content {
  transition: opacity .2s cubic-bezier(.84,-0.43,.14,.82);
}
.page-enter .content, .page-leave-to .content {
  opacity: 0;
}
</style>
