<template>
  <nav class="posts content" role="navigation">
    <ol reversed class="posts__links">
      <li v-for="post in posts" :key="post.permalink" class="posts__item">
        <saber-link :to="post.permalink" class="posts__link">
          <div class="posts__title">{{ post.title }}</div>
          <div class="posts__date"
            :data-short-date="formatPostDate(post.createdAt, true)">
            <time :datetime="post.createdAt"
            >{{ formatPostDate(post.createdAt) }}</time>
          </div>
        </saber-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { formatPostDate }  from '@/util'

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
  font-style: normal;
  margin-top: 2rem;
}

.posts__link {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: .5rem 0;
  border-bottom: 0;
  text-align: center;
  font-style: normal;
}

.posts__title {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.posts__date {
  margin-left: auto;
  flex-shrink: 0;
  padding-left: 7px;
}

@media (max-width: 70rem) {
  .posts__links {
    list-style: none;
    padding: 0;
  }
  .posts__date {
    display: none;
  }
  .posts__date time {
    position: fixed;
    opacity: 0;
  }
  .posts__date::before {
    content: attr(data-short-date);
  }
  .posts__title {
    text-overflow: ellipsis;
  }
}
</style>
