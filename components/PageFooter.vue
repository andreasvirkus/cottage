<template>
  <footer class="site-footer">
    <p class="content edit-link" v-if="repoLink">
      <a :href="repoLink" target="_blank" rel="noopener noreferrer">Help me improve this page</a>
    </p>

    <p>Find me on</p>
    <social-links />

    <p>
      Proudly generated with
      <a :href="$siteConfig.generatorUrl" :title="$siteConfig.generatorTitle">{{ $siteConfig.generatorName }}</a
      >,
    </p>
    <p>
      safely hosted on <a :href="$siteConfig.hostUrl" :title="$siteConfig.hostTitle">{{ $siteConfig.hostName }}</a
      >.
    </p>
  </footer>
</template>

<script>
import SocialLinks from './SocialLinks'

export default {
  name: 'PageFooter',
  props: ['page'],
  components: { SocialLinks },
  computed: {
    repoLink() {
      if (!this.page) return false
      return [this.$siteConfig.repoLink, `/edit/master/pages/`, `${this.page.slug}.md`].join('')
    }
  }
}
</script>

<style>
.site-footer {
  margin-top: 3rem;
  margin-bottom: 7.5rem;
  padding-right: 5vw;
  text-align: center;
}

.site-footer p {
  padding-right: 0;
  margin: 0.25rem;
  font-family: var(--font-secondary);
}
.edit-link {
  text-align: right;
  font-size: 0.9em;
}
</style>
