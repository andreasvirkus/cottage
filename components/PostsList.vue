<template>
  <nav class="content" role="navigation">
    <ol reversed :class="$style.links">
      <li v-for="post in posts" :key="post.permalink" :class="$style.item">
        <saber-link :to="post.permalink" :class="$style.link">
          <div :class="$style.title">{{ post.title }}</div>
          <div :class="$style.subtitle" :data-short-date="formatPostDate(post.createdAt, true)">
            <time :datetime="post.createdAt">{{ formatPostDate(post.createdAt) }}</time>

            <span :class="$style.tags">
              <code v-for="tag in post.tags" :key="tag">{{ tag }}</code>
            </span>
          </div>
        </saber-link>
        <div v-html="post.excerpt"></div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { formatPostDate } from '@/util'

export default {
  name: 'posts-list',
  props: {
    posts: Array
  },
  methods: { formatPostDate }
}
</script>

<style module>
.links {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 2rem;
  list-style: decimal-leading-zero;
}

.link {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2rem;
  border-color: transparent;
  box-shadow: none;
  font-style: normal;
  font-size: 1.6rem;
}
.link:hover {
  background: none;
}
.link code + code {
  margin-left: 0.5rem;
}

.subtitle {
  font-size: 14px;
}
</style>
