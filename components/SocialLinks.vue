<template>
  <div class="social">
    <ul class="social__list">
      <li class="social__icon" v-for="link in links">
        <a class="social__link fuzzy-interact"
          :href="link.link"
          :title="link.alt"
          :rel="link.rel"
          :type="link.type">
          <img :alt="link.name"
            :src="`/svg/${link.name.toLowerCase().replace('-', '')}.svg`">
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
  </div>
</template>

<script>
// TODO: Replace <img> with vue-svg-loader and icons
export default {
  name: 'social-links',
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
          link: '/rss2.xml',
          rel: 'alternate',
          type: 'application/rss+xml',
          name: 'RSS'
        }
      ]
    }
  }
}
</script>

<style>
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
</style>
