<template>
  <footer class="site-footer">
    <p class="content edit-link" v-if="repoLink">
      <a :href="repoLink" target="_blank" rel="noopener noreferrer"
      >Help me improve this page</a>
    </p>

    <p>Find me on</p>
    <ul class="social__list">
      <li class="social__icon" v-for="link in links">
        <a class="social__link fuzzy-interact"
          :href="link.link"
          :title="link.alt"
          :rel="link.rel"
          :type="link.type">
          <img :src="`/svg/${link.name.toLowerCase().replace('-', '')}.svg`">
        </a>
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
export default {
  props: ['page'],
  data () {
    return {
      links: [
        {
          alt: 'Glimpse at my code (GitHub)',
          link: 'https://www.github.com/andreasvirkus',
          name: 'GitHub'
        },
        {
          alt: 'View my scribblings (Codepen)',
          link: 'https://codepen.io/ajv/pens/popular/',
          name: 'Codepen'
        },
        {
          alt: 'See my network (LinkedIn)',
          link: 'https://www.linkedin.com/in/andreasvirkus',
          name: 'LinkedIn'
        },
        {
          alt: 'Pen pal me (e-mail)',
          link: 'mailto:write@andreasvirkus.me',
          name: 'E-mail',
        },
        {
          alt: 'Hear first of my posts (RSS)',
          link: '/rss.xml',
          rel: 'alternate',
          type: 'application/rss+xml',
          name: 'RSS'
        }
      ]
    }
  },
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

.social__list {
    text-align: right;
}

.social__icon {
    display: inline-block;
}
.social__icon + .social__icon {
    margin-left: 2em;
}
.social__link {
    position: relative;
    color: transparent;
    font-size: 0;
}

.social__link img {
    width: 30px;
    height: auto;
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
