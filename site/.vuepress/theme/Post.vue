<template>
  <main class="page">
    <article ref="article">

      <header>
        <h1>{{ $page.frontmatter.pageTitle }}</h1>
        <div class="post-stats">
          <span>published on the {{ formatPostDate($page.frontmatter.postDate, false) }}</span>
          <div v-if="$page.frontmatter.lastUpdated"> last updated on the {{ formatPostDate($page.frontmatter.lastUpdated, false) }}</div>
          <div v-if="readingTime"><em>{{ readingTime.text || readingTime }}</em></div>
        </div>
      </header>

      <Content/>

      <footer>
        <p>Thanks for giving this a read 🖖</p>
        <template v-if="prev || next">
          <hr class="blog__divider" />
          <div class="page-nav">
            <span v-if="prev" class="prev">
              ← <router-link v-if="prev" class="prev" :to="prev.path">
                {{ prev.frontmatter.pageTitle || prev.path }}
              </router-link>
            </span>
            <span v-if="next" class="next">
              <router-link v-if="next" :to="next.path">
                {{ next.frontmatter.pageTitle || next.path }}</router-link> →
            </span>
          </div>
          <hr class="blog__divider" />
        </template>
      </footer>

    </article>
  </main>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE, formatPostDate } from './util'
import readingTime from 'reading-time'

export default {
  data () {
    return {
      readingTime: '1 min read'
    }
  },
  methods: {
    formatPostDate: (date, short = true) => formatPostDate(date, short)
  },
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
  },
  mounted () {
    const content = this.$refs.article.querySelector('.content')
    this.readingTime = readingTime(content.textContent)
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

<style src="./css/blog.css"></style>
<style lang="stylus">
@import './css/variables.css'

.post-stats {
  font-size: .8em;
}
</style>
