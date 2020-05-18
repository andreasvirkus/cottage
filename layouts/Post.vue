<template>
  <main class="content">
    <article ref="article">
      <header>
        <h1>{{ page.title }}</h1>
        <div class="blog__stats">
          <span>published on the {{ formatPostDate(page.date) }}</span>
          <div v-if="page.lastUpdated">& last updated on the {{ formatPostDate(page.lastUpdated) }}</div>
          <div v-if="readingTime" class="blog__read-time">
            <em>{{ readingTime }}</em>
          </div>
        </div>

        <ul class="blog__tags">
          <li>tagged</li>
          <li v-for="tag in page.tags" :key="tag">
            <code>{{ tag }}</code>
          </li>
        </ul>
      </header>
      <hr />

      <slot name="default" />

      <footer class="blog__footer">
        <p>&ndash; Thanks for giving this a read 🖖</p>
        <template v-if="page.prevPost || page.nextPost">
          <hr class="blog__divider" />
          <div class="page-nav">
            <span v-if="page.prevPost" class="prev">
              ←
              <saber-link :to="page.prevPost.permalink">
                {{ page.prevPost.title }}
              </saber-link>
            </span>
            <span v-if="page.nextPost" class="next">
              <saber-link :to="page.nextPost.permalink">
                {{ page.nextPost.title }}
              </saber-link>
              →
            </span>
          </div>
          <hr class="blog__divider" />
        </template>
      </footer>
    </article>
  </main>
</template>

<script>
import { formatPostDate } from '@/util'
import readingTime from 'reading-time'

import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'post',
  data() {
    return {
      readingTime: null
    }
  },
  props: ['page'],
  components: {
    Sidebar,
    SearchBox,
    PageFooter
  },
  async mounted() {
    await this.$nextTick()
    const article = this.$refs.article
    if (!article) return

    this.readingTime = readingTime(article.textContent).text
  },
  head() {
    const { title, description, excerpt } = this.page
    return {
      title: title ? `${title} | ${this.$siteConfig.title}` : this.$siteConfig.title,
      meta: [
        {
          name: 'description',
          content: description || excerpt || this.$siteConfig.description
        }
      ]
    }
  },
  methods: { formatPostDate }
}
</script>

<style>
.blog__stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.825rem;
}
.blog__read-time {
  margin-left: 1rem;
}
.blog__tags {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
}
.blog__tags > li {
  margin-right: 0.5rem;
}
.blog__tags > li:first-child {
  font-size: 0.8rem;
}

.blog__post-info {
  font-style: italic;
  margin-top: 0.4em;
}

.blog__post-description {
  color: #888;
  font-style: italic;
}
.blog__footer {
  margin-top: 3.5rem;
}
.page-nav {
  display: flex;
  justify-content: space-between;
}
pre code {
  user-select: all;
}
</style>
