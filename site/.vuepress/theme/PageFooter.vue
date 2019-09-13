<template>
  <footer class="site-footer">
    <p class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
    </p>

    <social-links />
    <p>Proudly generated with
      <a :href="$site.themeConfig.generatorUrl"
        :title="$site.themeConfig.generatorTitle"
        >{{ $site.themeConfig.generatorName }}</a>,
    </p>
    <p>safely hosted on
      <a :href="$site.themeConfig.hostUrl"
        :title="$site.themeConfig.hostTitle"
        >{{ $site.themeConfig.hostName }}</a>.</p>
  </footer>
</template>

<script>
import SocialLinks from './SocialLinks'
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

export default {
  components: { SocialLinks },
  computed: {
    editLink () {
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master'
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'index.md'
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
    editLinkText () {
      return (
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  }
}
</script>

<style>
.site-footer {
  margin-top: 3rem;
  margin-bottom: 2.5rem;
}

.site-footer p {
  padding-right: 0;
  text-align: right;
  margin: 0;
}
.edit-link {
  text-align: right;
  font-size: .9em;
}

@media screen and (min-width: 35em) {
    .site-footer {
        padding-right: 3em;
    }
}

@media screen and (max-width: 35em) {
    .site-footer {
        padding-right: 1.5rem;
        font-size: 0.8rem;
    }
}
</style>