<template>
  <div class="theme-container"
    :class="$page.frontmatter.pageClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">

    <SearchBox/>
    <Sidebar/>

    <component v-if="$page.frontmatter.layout" :is="$page.frontmatter.layout"/>

    <Page v-else />

    <page-footer/>
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Blog from './Blog'
import Post from './Post'
import Dashboard from './Dashboard'
import Contact from './Contact'
import SearchBox from './SearchBox'
import Sidebar from './Sidebar'
import Page from './Page'
import PageFooter from './PageFooter'
import { pathToComponentName, getLang } from '@app/util'

export default {
  components: {
    Blog,
    Post,
    Page,
    PageFooter,
    SearchBox,
    Sidebar,
    Dashboard,
    Contact
  },
  created () {
    if (this.$ssrContext) {
      const { titleSeparator, titleStatic } = this.$site.themeConfig
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },
  mounted () {
    // configure progress bar
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start()
      }
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
    })
  },
  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)
  },
  methods: {
    // TODO: add side swipe for menu open/close
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          // this.toggleSidebar(true)
        } else {
          // this.toggleSidebar(false)
        }
      }
    }
  }
}

function updateMetaTags (meta, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  if (meta) {
    return meta.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}

function getTitle(siteTitle, page, separator = '|', staticTitle = false) {
  const selfTitle = page.frontmatter.pageTitle || page.title
  if (staticTitle || selfTitle === siteTitle) return siteTitle

  return siteTitle
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="./styles/theme.styl" lang="stylus"></style>
<style src="./css/variables.css"></style>
<style src="./css/global.css"></style>
<style>
::selection {
  background-color: #a29bfe;
  color: #fff;
}

.theme-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: var(--bg-light);
  margin: var(--bg-border);
}
</style>
