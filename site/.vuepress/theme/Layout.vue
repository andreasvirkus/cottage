<template>
  <div class="theme-container"
    :class="$page.frontmatter.pageClass">
    <search-box/>
    <sidebar/>

    <component v-if="$page.frontmatter.layout"
      :is="$page.frontmatter.layout"/>
    <page v-else />

    <page-footer/>
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Blog from './Blog'
import Post from './Post'
import Page from './Page'
import Contact from './Contact'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import SearchBox from './SearchBox'
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
    // updateMetaTags(null, this.currentMetaTags)
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
