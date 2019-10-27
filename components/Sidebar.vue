<template>
  <aside
    ref="menu"
    class="menu"
    :class="{ 'menu--open': open }"
    role="navigation">

    <nav class="menu__list">
      <div class="menu__blob"
        :style="{ '--activeIndex': activeLinkIndex }"></div>
      <saber-link v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="menu__link">{{ link.label }}</saber-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    const emojis = ['👾', '😶', '🐨', '🐹', '🦊', '🧙‍♂️', '🚀']
    const homeLabel = emojis[Math.floor(Math.random() * emojis.length)]

    return {
      menu: null,
      open: false,
      narrowViewport: false,
      pathEl: [],
      paths: [],
      links: [
        {
          label: homeLabel,
          path: '/'
        },
        {
          label: 'me',
          path: '/about'
        },
        {
          label: 'thoughts',
          path: '/thoughts'
        },
        {
          label: 'contact',
          path: '/contact'
        },
      ]
    }
  },
  props: ['page'],
  computed: {
    activeLinkIndex () {
      const path = this.$route.path
      if (path.startsWith('/thoughts')) return 2
      return this.links.findIndex(link => link.path === path ||
        link.path + '/' === path) || 0
    }
  }
}
</script>

<style>
.menu {
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 5;
  transition: transform 0.6s, top .4s;
}
.menu::before {
  content: '';
  display: block;
  position: absolute;
  height: 84vh;
  top: 6vh;
  left: 100%;
  z-index: 5;
  width: 2px;
  background-color: #22223320;
}
.menu__list {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem 0;
  margin-top: 6vh;
}
.menu__link {
  padding: 1rem 2rem 1rem 3.5rem;
  cursor: pointer;
  flex-grow: 1;
  line-height: 1;
  transition: transform .2s ease-out;
}
.menu__link:hover {
  transform: translateX(.75rem);
}
.menu__blob {
  position: absolute;
  top: 2.45rem;
  right: -.25rem;
  width: 6px;
  height: 2.75rem;
  border-radius: 3px;
  background-color: var(--color-background);
  transform: translateY(calc(var(--activeIndex, 0) * 3rem));
  transition: transform .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@media screen and (max-width: 74rem) {
  .menu {
    bottom: 0;
    top: initial;
    height: auto;
    width: 100vw;
    background: #fff;
    border: 15px solid #223;
    border-top: none;
    box-shadow: 0px -4px 6px rgba(45, 55, 72, 0.1),
      0px -4px 4px rgba(45, 55, 72, 0.06);
  }
  .menu::before {
    content: none;
  }
  .menu__list {
    flex-direction: row;
    width: 100%;
    padding: 0 1rem;
    margin: 0 auto;
    max-width: 35rem;
  }
  .menu__link {
    flex: 1;
    font-size: .875rem;
    padding: 1rem .75rem;
    border-top: 3px solid transparent;
    transition: border-color .3s ease-out;
  }
  .router-link-exact-active {
    border-color: var(--color-accent);
    font-weight: 600;
  }
  .menu__blob {
    opacity: 0;
    top: -.125rem;
    height: 6px;
    right: initial;
    left: 2rem;
    width: 2rem;
    transform: translateX(calc(var(--activeIndex, 0) * 4rem));
  }
}
</style>
