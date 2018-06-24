<template>
  <main class="page">
    <!-- <header>
      {{#if readingTime}}
          Reading time {{ readingTime }} min |
      {{/if}}

      published on the {{ date postDate }}

      {{#if lastUpdated }}
          and last updated {{ date lastUpdated }}
      {{/if}}
    </header> -->
    <article>
      <h1>{{ $page.frontmatter.pageTitle }}</h1>
      <Content />
    </article>

    <footer>
      <p>Thanks for giving this a read 🖖</p>
      <template v-if="prev || next">
        <hr class="blog__divider" />
        <div class="page-nav">
          <span v-if="prev" class="prev">
            ← {{ formatPostDate(prev.frontmatter.postDate) }}
            <router-link v-if="prev" class="prev" :to="prev.path">
              {{ prev.frontmatter.pageTitle || prev.path }}
            </router-link>
          </span>
          <span v-if="next" class="next">
            {{ formatPostDate(next.frontmatter.postDate) }}
            <router-link v-if="next" :to="next.path">
              {{ next.frontmatter.pageTitle || next.path }}
            </router-link> →
          </span>
        </div>
        <hr class="blog__divider" />
      </template>
    </footer>
  </main>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE, formatPostDate } from './util'

export default {
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

<style src="./css/blog.css"></style>
<style lang="stylus">
@import './css/variables.css'
</style>
