<template>
  <main class="page">
    <Content :custom="false"/>
    <div class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
    </div>
    <div class="content page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ← <router-link v-if="prev" class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>
        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ next.title || next.path }}
          </router-link> →
        </span>
      </p>
    </div>
  </main>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

export default {
  computed: {
    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page)
      }
    },
    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page)
      }
    },
    editLink () {
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master'
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }

      if (repo && editLinks) {
        const base = outboundRE.test(repo)
          ? repo
          : `https://github.com/${repo}`
        return (
          base.replace(endingSlashRE, '') +
          `/edit/${docsBranch}/` +
          docsDir.replace(endingSlashRE, '') +
          path
        )
      }
    },
    editLinkText () {
      return (
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items = [], offset) {
  const res = []

  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...item.children || [])
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="stylus">
@import './css/variables.css'

.page
  padding-bottom 2rem

.page-nav
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 3rem;
  .next
    margin-left auto

@media (max-width: 35em) {
  .prev {
    display: block;
    margin-bottom: .5rem;
  }
  .prev + .next {
    margin-top: .5rem;
  }
}
</style>
