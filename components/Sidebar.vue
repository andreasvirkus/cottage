<template>
  <aside ref="menu" class="menu" :class="{ 'menu--open': open }" role="navigation">
    <nav class="menu__list">
      <saber-link v-for="link in links" :key="link.path" :to="link.path" class="menu__link">
        {{ link.label }}
      </saber-link>
    </nav>

    <search-box />
    <theme-toggle />
  </aside>
</template>

<script>
import SearchBox from './SearchBox'
import ThemeToggle from './ThemeToggle'

export default {
  name: 'Sidebar',
  components: { SearchBox, ThemeToggle },
  data() {
    return {
      menu: null,
      open: false,
      narrowViewport: false,
      pathEl: [],
      paths: [],
      links: [
        {
          label: `~/`,
          path: '/'
        },
        {
          label: '/me',
          path: '/me'
        },
        {
          label: '/thoughts',
          path: '/thoughts'
        },
        {
          label: '/contact',
          path: '/contact'
        }
      ]
    }
  },
  props: ['page'],
  computed: {
    activeLinkIndex() {
      const path = this.$route.path
      if (path.startsWith('/thoughts')) return 2
      return this.links.findIndex(link => link.path === path || link.path + '/' === path) || 0
    }
  }
}
</script>

<style>
@supports (backdrop-filter: blur(20px)) {
  .menu {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    margin-top: 3.5rem;
    transition: transform 0.6s, top 0.4s;
    backdrop-filter: blur(20px);
  }
}

.menu__list {
  position: relative;
  display: flex;
  align-items: center;
  height: 4.5rem;
  flex-direction: row;
  max-width: 80ch;
  text-align: center;
  padding: 0;
  margin: 0 auto;
}
.menu__link {
  position: relative;
  padding: 1rem 0.5rem;
  cursor: pointer;
  flex-grow: 1;
  line-height: 1;
  transition: transform 0.2s ease-out;
}
.menu__link::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
}
.menu__link:not(.router-link-exact-active):hover::after {
  background-color: var(--color);
  opacity: 0.2;
}
.menu__link.router-link-exact-active::after {
  background-image: var(--gradient);
}
</style>
