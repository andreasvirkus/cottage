<template>
  <div class="social">
    <ul class="social__list">
      <li v-for="link in links" :key="link.name">
        <a class="social__link fuzzy-interact foxy-box"
          :href="link.link"
          :title="link.alt"
          :rel="link.rel"
          :type="link.type"
          :target="link.type ? '_blank' : null">
          <img :alt="link.name"
            class="social__icon"
            :src="`/svg/${link.name.toLowerCase().replace('-', '')}.svg`">
        </a>
      </li>
    </ul>
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
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin-top: 0;
}
.social__icon {
  width: 1.4rem;
  height: auto;
}
.social__link {
  position: relative;
  display: inline-block;
  color: transparent;
  font-size: 0;
  padding: .5rem;
  margin-left: 1rem;
}
</style>
