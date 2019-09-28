<template>
  <div class="theme-container">
    <search-box/>
    <sidebar/>

    <main class="content">
      <article ref="article">
        <header>
          <h1>{{ page.title }}</h1>
          <div class="post-stats">
            <span>published on the {{ formatPostDate(page.date) }}</span>
            <div v-if="page.lastUpdated"> last updated on the
            {{ formatPostDate(page.lastUpdated) }}</div>
            <div v-if="readingTime"><em>{{ readingTime }}</em></div>
          </div>
        </header>

        <slot name="default"/>

        <footer>
          <p>Thanks for giving this a read 🖖</p>
          <template v-if="prev || next">
            <hr class="blog__divider" />
            <div class="page-nav">
              <span v-if="page.prevPost" class="prev">
                ← <saber-link :to="page.prevPost.permalink">
                  {{ page.prevPost.title }}
                </saber-link>
              </span>
              <span v-if="page.nextPost" class="next">
                <saber-link :to="page.nextPost.permalink">
                  {{ page.nextPost.title }}
                </saber-link> →
              </span>
            </div>
            <hr class="blog__divider" />
          </template>
        </footer>
      </article>
    </main>

    <page-footer :page="page"/>
  </div>
</template>

<script>
import { formatPostDate } from '@/util'
import readingTime from 'reading-time'

import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import PageFooter from '@/components/PageFooter'

export default {
  data () {
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
  async mounted () {
    await this.$nextTick()
    const article = this.$refs.article
    if (!article) return

    const content = article.querySelector('.content')
    this.readingTime = readingTime(content.textContent).text
  },
  head () {
    const { title, description, excerpt } = this.page
    return {
      title: title
        ? `${title} | ${this.$siteConfig.title}`
        : this.$siteConfig.title,
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
.blog__divider {
  background-color: var(--blog-post-divider);
  background-image: var(--blog-post-divider);
}

.blog__post-info {
  font-style: italic;
  margin-top: 0.4em;
}

.blog__post-description {
  color: #888;
  font-style: italic;
}

pre code {
  user-select: all;
}
</style>
