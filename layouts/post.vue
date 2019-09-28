<template>
  <main class="page">
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
</template>

<script>
import { formatPostDate } from '@/util'
import readingTime from 'reading-time'

export default {
  data () {
    return {
      readingTime: null
    }
  },
  props: ['page'],
  async mounted () {
    await this.$nextTick()
    const article = this.$refs.article
    if (!article) return

    const content = article.querySelector('.content')
    this.readingTime = readingTime(content.textContent).text
  },
  methods: { formatPostDate }
}
</script>

<style src="@/css/blog.css"></style>
<style>
.post-stats {
  font-size: .8em;
}
</style>
