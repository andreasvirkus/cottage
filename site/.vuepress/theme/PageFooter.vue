<template>
  <footer class="site-footer">
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

export default {
  components: { SocialLinks }
}
</script>

<style>
.site-footer {
  margin-bottom: 1.5rem;
}

.site-footer p {
  padding-right: 0;
  text-align: right;
  margin: 0;
}

@media screen and (min-width: 35em) {
    .site-footer {
        padding-right: 3em;
    }
}

@media screen and (max-width: 35em) {
    .site-footer {
        padding-right: 1em;
        font-size: 0.8rem;
    }
}
</style>