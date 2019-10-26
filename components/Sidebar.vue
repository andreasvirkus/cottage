<template>
  <aside
    ref="menu"
    class="menu"
    :class="{ 'menu--open': open }"
    role="navigation">
    <!-- @touchstart="onTouchStart"
    @touchend="onTouchEnd"> -->
    <button class="menu__handle"
      ref="handle"
      id="menu-handle"
      aria-label="Menu"
      :title="`${open ? 'Close' : 'Open'} menu`"
      @click="toggle">
      <span class="menu__line"></span>
      <span class="menu__line"></span>
      <span class="menu__line"></span>
    </button>

    <nav class="menu__list">
      <div class="menu__blob"
        :style="{ '--activeIndex': activeLinkIndex }"></div>
      <saber-link v-for="link in links"
        :key="link.path"
        :to="link.path"
        @click.native="hideMenu"
        class="menu__link">{{ link.label }}</saber-link>
    </nav>

    <div v-if="false" class="morph-shape" id="menu-shape" ref="shape"
      data-morph-open="M300-10c0,0,295,164,295,410c0,232-295,410-295,410"
      data-morph-close="M300-10C300-10,5,154,5,400c0,232,295,410,295,410">
      <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none">
        <path fill="none" d="M300-10c0,0,0,164,0,410c0,232,0,410,0,410"/>
      </svg>
    </div>
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
  mounted () {
    this.narrowViewport = document.body.clientWidth < 1120
    if (this.narrowViewport) {
      // window.Snap = require('snapsvg-cjs')
      // this.init()
      window.addEventListener('touchstart', this.onTouchStart)
      window.addEventListener('touchend', this.onTouchEnd)
    }

    window.addEventListener('keyup', this.onKeyUp)
  },
  beforeDestroy () {
    window.removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchend', this.onTouchEnd)
    window.removeEventListener('keyup', this.onKeyUp)
  },
  computed: {
    activeLinkIndex () {
      const path = this.$route.path
      if (path.startsWith('/thoughts')) return 2
      return this.links.findIndex(link => link.path === path ||
        link.path + '/' === path) || 0
    }
  },
  methods: {
    init () {
      this.shapeEl = this.$refs.shape

      const s = window.Snap(this.shapeEl.querySelector('svg'))
      this.pathEl = s.select('path')
      this.paths = {
        reset: this.pathEl.attr('d'),
        open: this.shapeEl.getAttribute('data-morph-open'),
        close: this.shapeEl.getAttribute('data-morph-close')
      }
    },
    toggle (forcedState) {
      // this.open = typeof forcedState === 'boolean' ? forcedState : !this.open

      // Simply toggling atm since Snap breaks CSP
      this.open = !this.open
      return

      // FIXME: Snap uses Function(), so need to
      // call Snap.animate() instead
      // or switch it to a custom easing.
      if (!this.narrowViewport) {
        this.open = !this.open
        return
      }

      // Tween path's d coordinates with snapSVG
      this.pathEl.stop().animate({
        'path': this.open
            ? this.paths.close
            : this.paths.open
        },
        350,
        mina.easeout,
        () => {
          this.pathEl.stop().animate(
            { 'path' : this.paths.reset },
            800,
            mina.elastic
          )
        }
      )

      this.open = !this.open
    },
    hideMenu () {
      setTimeout(() => this.open = false, 400)
    },
    onKeyUp (e) {
      if (e.key === 'Escape' && this.open) this.open = false
    },
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      if ([e.target.id, e.target.parentNode.id].includes('menu-handle')) {
        return
      }
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        const swipedOpen = dx > 0 && this.touchStart.x <= 80
        const swipedClose = dx < 0
        const shouldToggle = !this.open && swipedOpen || this.open && swipedClose
        shouldToggle && this.toggle()
      }
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
}
.menu__handle {
  display: none;
}
.menu__blob {
  position: absolute;
  top: 2.75rem;
  right: -.25rem;
  width: 6px;
  height: 2.75rem;
  border-radius: 3px;
  background-color: var(--color-background);
  transform: translateY(calc(var(--activeIndex, 0) * 3rem));
  transition: transform .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.morph-shape {
  position: absolute;
  top: 0;
  right: -12.5rem;
  width: 240px;
  pointer-events: none;
  /* Testing new responsive styles */
  height: 85vh;
  transition: top .2s, height .2s;
}

.morph-shape path {
  stroke: var(--menu-color);
  stroke-width: 5px;
}

@media screen and (max-width: 74rem) {
  /* Old menu styles */
  /*.menu {
    top: 2rem;
    transform: translateX(-185px);
  }
  .menu::after {
    content: '';
    width: 140vw;
    height: 130vh;
    position: absolute;
    top: -5em;
    left: 0;
    transition: ease-in background-color .1s;
    z-index: -1;
    pointer-events: none;
  }
  .menu__handle {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    bottom: 5rem;
    right: -4.75rem;
    border: none;
    outline: none;
    cursor: pointer;
    z-index: 4;
    width: 2rem;
    height: 2rem;
    background-color: rgba(255, 255, 255, .95);
    padding: .5rem;
    box-shadow: 0 16px 24px 0 rgba(118, 143, 255, .2);
    border: 1px solid #DBE5EF;
  }

  .menu__line {
    background-color: var(--menu-color);
    height: 3px; // old style
    height: 2px;
    transition: transform 0.25s ease-in-out 0.3s,
      width 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s;
  }
  .menu__line:nth-child(1),
  .menu__line:nth-child(3) {
    width: 50%;
    transform-origin: 50% 50%;
    will-change: transform;
  }
  .menu__line:nth-child(2) {
    width: 100%;
    transition: opacity .1s ease-out;
    will-change: opacity;
  }
  .menu__line:nth-child(3) {
    align-self: flex-end;
  }

  .menu--open .menu__line {
    width: 100%;
  }
  .menu--open .menu__line:nth-child(1),
  .menu--open .menu__line:nth-child(3) {
    transition: transform 0.25 ease-in-out,
      width 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .menu--open .menu__line:nth-child(1) {
    transform: rotate3d(0, 0, 1, 45deg) translate(5px, 5px);
  }
  .menu--open .menu__line:nth-child(2) {
    opacity: 0;
  }
  .menu--open .menu__line:nth-child(3) {
    transform: rotate3d(0, 0, 3, -45deg) translate(4px, -3px);
  }

  .menu.menu--open {
    transform: translateX(0);
  }

  // Menu background overlay
  .menu--open::after {
    background-color: var(--menu-overlay);
    pointer-events: inherit;
  }
  .menu.menu--open + main {
    opacity: 0.6;
    pointer-events: none;
  }*/

  /* New menu (fixed bottom bar) */
  .menu {
    bottom: 0;
    top: initial;
    height: auto;
    width: 100vw;
  }
  .menu::before {
    height: 3px;
    top: 0;
    left: 10vw;
    width: 80vw;
  }
  .menu__list {
    flex-direction: row;
    width: 100%;
    background: #fff;
    border: 15px solid #223;
    border-top: none;
    padding: 0 1rem;
    margin: 0;
  }
  .menu__link {
    flex: 1;
    font-size: .875rem;
    padding: 1rem .5rem;
  }
  .menu__blob {
    top: -.125rem;
    height: 6px;
    right: initial;
    left: 2rem;
    width: 2rem;
    transform: translateX(calc(var(--activeIndex, 0) * 4rem));
  }
}

@media screen and (min-width: 70rem) {
  .morph-shape {
    height: 80vh;
    right: -13rem;
  }
}
</style>
