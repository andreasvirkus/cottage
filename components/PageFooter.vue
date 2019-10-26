<template>
  <footer class="site-footer">
    <p class="content edit-link" v-if="repoLink">
      <a :href="repoLink" target="_blank" rel="noopener noreferrer"
      >Help me improve this page</a>
    </p>

    <p>Find me on</p>
    <social-links/>

    <p>Proudly generated with
      <a :href="$siteConfig.generatorUrl"
        :title="$siteConfig.generatorTitle"
      >{{ $siteConfig.generatorName }}</a>,
    </p>
    <p>safely hosted on
      <a :href="$siteConfig.hostUrl"
        :title="$siteConfig.hostTitle"
      >{{ $siteConfig.hostName }}</a>.
    </p>
  </footer>
</template>

<script>
import SocialLinks from './SocialLinks'

export default {
  name: 'page-footer',
  props: ['page'],
  components: { SocialLinks },
  computed: {
    repoLink () {
      if (!this.page) return false
      return [
        this.$siteConfig.repoLink,
        `/edit/master/pages/`,
        `${this.page.slug}.md`
      ].join('')
    }
  }
}
</script>

<style>
.site-footer {
  margin-top: 3rem;
  margin-bottom: 2.5rem;
  padding-right: 5vw;
}

.site-footer p {
  padding-right: 0;
  text-align: right;
  margin: .25rem;
}
.edit-link {
  text-align: right;
  font-size: .9em;
}

@media screen and (max-width: 35rem) {
  .site-footer {
    padding-right: 1.5rem;
    font-size: 0.8rem;
  }
}
@media screen and (max-width: 74rem) {
  .site-footer {
    margin-bottom: 5.5rem;
  }
}
</style>
