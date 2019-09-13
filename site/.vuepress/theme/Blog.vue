<template>
  <main class="page">
    <Content :custom="false" />

    <blog-links :posts="posts"/>
  </main>
</template>

<script>
import BlogLinks from './BlogLinks'

export default {
  components: { BlogLinks },
  computed: {
    posts () {
      return this.$site.pages.filter(page => page.path.startsWith('/thoughts/')
        && !page.frontmatter.draft
        && !page.path.endsWith('/thoughts/'))
    },
  }
}
</script>

<style src="./css/blog.css"></style>
