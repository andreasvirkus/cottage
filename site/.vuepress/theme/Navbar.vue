<template>
  <header class="navbar" :class="{ sticky }" ref="bar">
    <router-link to="/" class="home-link">
        <pre>~/</pre>
    </router-link>
    <div class="links">
      <SearchBox v-if="$site.themeConfig.search !== false"/>
    </div>
  </header>
</template>

<script>
import SearchBox from './SearchBox'
import NavLinks from './NavLinks'

export default {
  components: { NavLinks, SearchBox },
  data () {
    return {
      sticky: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handler)
  },
  destroy () {
    window.addEventListener('scroll', this.handler)
  },
  methods: {
    handler (evt) {
      this.sticky = document.documentElement.scrollTop > 50
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.navbar
  padding 0.7rem 1.5rem
  line-height $navbarHeight - 1.4rem
  position relative
  border-bottom 1px solid transparent
  transition all 0.2s
  // margin-right: 10px; // Add when we add body border

  a, span, img
    display inline-block
  pre
    margin 0
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    font-size 0.9rem
    position absolute
    right 1.5rem
    top 0.7rem
  .home-link
    transition opacity .1s
    opacity 0
  &.sticky
    border-color #a29bfe82
    box-shadow 0 2px 10px -4px rgba(0, 0, 0, 0.2)
    background-color rgba(255, 255, 255, .92)
    transition-delay 0s
    // Add when we add body border
    // transform: translate(10px);
    // margin-right: 20px;

    .home-link
      opacity 1


@media (max-width: 70rem)
  .navbar.sticky
    transition-delay .2s
</style>
