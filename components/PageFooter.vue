<template>
  <footer class="site-footer">
    <p class="content edit-link">
      <a :href="repoLink" target="_blank" rel="noopener noreferrer"
      >Help me improve this page</a>
    </p>

    <p>Find me on</p>
    <ul class="social__list">
      <li class="social__icon" v-for="link in links">
        <a class="social__link fuzzy-interact"
          :href="link.link"
          :title="link.alt"
          v-html="link.icon"
          :rel="link.rel"
          :type="link.type"></a>
      </li>
    </ul>

    <svg class="fuzzy-filters">
      <filter id="turbulence-1">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
      </filter>

      <filter id="turbulence-2">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" />
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="7" />
      </filter>

      <filter id="turbulence-3">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" />
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
      </filter>

      <filter id="turbulence-4">
        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" />
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="4" />
      </filter>

      <filter id="turbulence-5">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" />
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="3" />
      </filter>
    </svg>

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
  props: ['page'],
  components: { SocialLinks },
  computed: {
    repoLink () {
      console.log('page', this.page)
      return [
        this.$siteConfig.repoLink,
        `/edit/master/`,
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
