<template>
  <main class="page">
    <Content :custom="false" />

    <blog-links :posts="posts"/>

    <div class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
      <OutboundLink/>
    </div>
  </main>
</template>

<script>
import BlogLinks from './BlogLinks'
import OutboundLink from './OutboundLink'
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

export default {
  components: { BlogLinks, OutboundLink },
  computed: {
    posts () {
      return this.$site.pages.filter(page => page.path.startsWith('/thoughts/')
        && !page.frontmatter.draft
        && !page.path.endsWith('/thoughts/'))
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
