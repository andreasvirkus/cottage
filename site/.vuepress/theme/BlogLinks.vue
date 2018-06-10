<template>
  <nav class="blog__menu content" role="navigation">
    <ul class="blog__menu-list">
      <li v-for="(post, i) in posts" :key="i" class="blog__menu-item" :class="{ active: post.path === $router.path }">
        <router-link :to="post.path" class="blog__menu-link">
          <div class="blog__menu-title">{{ post.frontmatter.pageTitle }}</div>
          <div class="blog__menu-date"
            :data-short-date="formatPostDate(post.frontmatter.postDate, true)">
            <time :datetime="post.frontmatter.postDate">{{ formatPostDate(post.frontmatter.postDate) }}</time>
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import dayjs from 'dayjs'
import format from 'dayjs/plugin/advancedFormat'

dayjs.extend(format)

export default {
  props: {
    posts: Array
  },
  methods: {
    formatPostDate(date, short = false) {
      const format = short ? 'MMM, Do' : 'Do of MMM, YYYY'
      return dayjs(date).format(format)
    }
  }
}
</script>

<style lang="stylus">
@import './css/variables.css'

.blog__menu-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    flex-wrap: wrap;
    padding-left: 0;
    font-style: normal;
}

.blog__menu-link {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    text-decoration: none;
    border-bottom: 0;
    text-align: center;
    font-style: normal;
}
.blog__menu-link::before {
    content: '';
    left: 0;
    bottom: 1rem;
    width: 100%;
    height: 2px;
    background-color: var(--dark-accent-color);
    position: absolute;
    transition: transform .5s ease;
    transform: scaleX(0);
}

.blog__menu-title {
  overflow: hidden;
  white-space: nowrap;
}

.blog__menu-date {
    margin-left: auto;
    flex-shrink: 0;
    padding-left: 7px;
}


@media (min-width: 35rem) {
  .blog__menu-title::after {
    letter-spacing: 4px;
    content: " .........................................................................";
  }
}

@media (max-width: 35rem)
  .blog__menu-date {
      padding-left: 0;
  }
  .blog__menu-date time {
      position: fixed;
      opacity: 0;
  }
  .blog__menu-date::before {
      content: attr(data-short-date);
  }
  .blog__menu-title {
    text-overflow: ellipsis;
  }
</style>
