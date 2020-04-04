<template>
  <nav class="posts content" role="navigation">
    <ol reversed class="posts__links">
      <li v-for="post in posts" :key="post.permalink" class="posts__item">
        <saber-link :to="post.permalink" class="posts__link">
          <div class="posts__title">{{ post.title }}</div>
          <div class="posts__date" :data-short-date="formatPostDate(post.createdAt, true)">
            <time :datetime="post.createdAt">{{ formatPostDate(post.createdAt) }}</time>
          </div>
        </saber-link>
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

<style>
.posts__links {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 2rem;
  list-style: decimal-leading-zero;
}

.posts__link {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  border-color: transparent;
  box-shadow: none;
}

.posts__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.posts__date {
  margin-left: auto;
  flex-shrink: 0;
  padding-left: 7px;
}

@media (max-width: 70rem) {
  .posts__date {
    display: none;
  }
}
</style>
