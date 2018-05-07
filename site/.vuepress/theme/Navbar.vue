<template>
  <header class="navbar" :class="{ sticky }" ref="bar">
    <router-link to="/" class="home-link">
      <img class="logo"
        v-if="$site.themeConfig.logo"
        :src="'/' + $withBase($site.themeConfig.logo)">
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
  transition height .2s, box-shadow .2s, border-color .1s
  transition-delay 0
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
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
  &.sticky
    //border-bottom 1px solid $borderColor
    box-shadow 0 2px 10px -4px rgba(0, 0, 0, 0.2)
    background-color #fff


@media (max-width: $MQNarrow)
  .home-link
    transition opacity .1s
    opacity 0
  .navbar.sticky
    transition-delay .4s
  .navbar.sticky .home-link
    opacity 1
</style>
