<template>
  <main class="page">
    <Content :custom="false" />

    <blog-nav :posts="posts"/>

    <div class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
      <OutboundLink/>
    </div>
  </main>
</template>

<script>
import BlogNav from './partials/BlogNav'
import OutboundLink from './OutboundLink.vue'
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'
// TODO: Get posts (all .md files from /thoughts dir)
export default {
  components: { BlogNav, OutboundLink },
  computed: {
    posts () {
      return this.$site.pages.filter(page => page.path.startsWith('/thoughts/') && !page.frontmatter.draft)
    },
    // TODO: Move editLink, prev & next to a mixin
    editLink () {
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master'
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }

      if (repo && editLinks) {
        const base = outboundRE.test(repo)
          ? repo
          : `https://github.com/${repo}`
        return (
          base.replace(endingSlashRE, '') +
          `/edit/${docsBranch}/` +
          docsDir.replace(endingSlashRE, '') +
          path
        )
      }
    },
  }
}
</script>

<style src="./css/blog.css"></style>
