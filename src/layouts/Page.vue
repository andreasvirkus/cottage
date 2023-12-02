<template>
  <main class="content">
    <slot />

    <posts-list v-if="page.posts" :posts="page.posts" />
  </main>
</template>

<script>
import PostsList from '@/components/PostsList'

export default {
  name: 'page',
  props: ['page'],
  components: { PostsList },
  head() {
    const { title, description, excerpt } = this.page
    const defaultTitle = this.$siteConfig.title
    return {
      title: title && title !== defaultTitle ? `${title} | ${defaultTitle}` : defaultTitle,
      meta: [
        {
          name: 'description',
          content: description || excerpt || this.$siteConfig.description,
        },
      ],
    }
  },
}
</script>

<style>
.nprogress {
  height: 0.75rem;
  background-color: cornflowerblue;
}
</style>
