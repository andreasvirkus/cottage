<template>
  <aside id="menu"
    ref="menu"
    class="menu"
    :class="{ 'menu--open': open }"
    role="navigation"
    @keyup.esc="toggle">
    <!-- @touchstart="onTouchStart"
    @touchend="onTouchEnd"> -->
    <button class="menu__handle"
      ref="handle"
      id="menu-handle"
      :title="`${open ? 'Close' : 'Open'} menu`"
      @click="toggle">
      <span>Menu</span>
    </button>

    <nav class="menu__list">
      <div class="menu__blob"
        :style="{ '--activeIndex': activeLinkIndex }"></div>
      <saber-link v-for="link in links"
        :key="link.path"
        :to="link.path"
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
    return {
      open: false,
      narrowViewport: false,
      menu: null,
      pathEl: [],
      paths: [],
      links: [
        {
          label: '👾',
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
    this.narrowViewport = document.body.clientWidth < 790
    if (this.narrowViewport) {
      // window.Snap = require('snapsvg-cjs')
      // this.init()
      window.addEventListener('touchstart', this.onTouchStart)
      window.addEventListener('touchend', this.onTouchEnd)
    }
	},
	beforeDestroy () {
    window.removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchend', this.onTouchEnd)
	},
  computed: {
    activeLinkIndex () {
      return this.links.findIndex(link => link.path === this.$route.path) || 0
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
	padding: 2rem 2rem 2rem 3.5rem;
	margin-top: 6vh;
}
.menu__link {
	padding: 1em 0;
	cursor: pointer;
	flex-grow: 1;
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
  background-color: var(--bg-dark);
  transform: translateY(calc(var(--activeIndex, 0) * 3.5625rem));
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
		display: block;
		position: absolute;
		bottom: 5rem;
		right: -4.75rem;
		background-color: transparent;
		width: 25px;
		height: 24px;
		padding: 0;
		border: none;
		outline: none;
		z-index: 4;
		cursor: pointer;
		pointer-events: all;
  	/*box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1), 7px 7px 0 0 #004EFF;*/
	}

	.menu__handle::before,
	.menu__handle::after,
	.menu__handle span {
		background-color: var(--menu-color);
		position: absolute;
		height: 3px; /* old style */
		height: 2px;
		left: 0;
		transition: transform 0.25s ease-in-out 0.3s,
			width 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s,
			opacity 0.4s ease-in-out 0.3s;
	}

	.menu__handle::before,
	.menu__handle::after {
		content: '';
		top: 50%;
    width: 50%;
		transform-origin: 50% 50%;
	}

	.menu__handle span {
		width: 55%; /* old style */
		width: 100%;
		text-indent: 200%;
		color: transparent;
	}

	.menu__handle::before {
		transform: translate3d(0, -8px, 0);
    z-index: 3;
		/* width: 100%; old style */
	}

	.menu__handle::after {
		transform: translate3d(0, 8px, 0);
    right: 0;
    left: initial;
		/* width: 75%; old style*/
	}

	.menu--open .menu__handle span {
		opacity: 0;
	}

  .menu--open .menu__handle span,
	.menu--open .menu__handle::before,
	.menu--open .menu__handle::after {
		transition: transform 0.25s 0.7s ease-in-out, width 0.2s 0.2s ease-in-out, opacity 0.2s ease-in-out;
	}
	.menu--open .menu__handle::before,
	.menu--open .menu__handle::after {
    width: 100%;
	}
	.menu--open .menu__handle::before {
		transform: rotate3d(0, 0, 1, 45deg);
	}

	.menu--open .menu__handle::after {
		transform: rotate3d(0, 0, 1, -45deg);
	}

	.menu:not(.menu--open) {
		pointer-events: none;
	}

	.menu {
		top: 2rem;
		transform: translateX(-185px);
	}
	.menu.menu--open,
	.menu.menu--open .nav__item {
		transform: translateX(0);
	}
	.menu__handle span::before {
		content: '';
		background-color: var(--menu-overlay);
		position: absolute;
		top: -20px;
		left: -7px;
		right: -7px;
		bottom: -20px;
		z-index: -1;
		width: 45px;
	}

	/* Menu background overlay */
	.menu--open::after {
		background-color: var(--menu-overlay);
		pointer-events: inherit;
	}
  .menu--open::before {
    background-color: #22223340;
  }
	.menu.menu--open + main {
		opacity: 0.6;
		pointer-events: none;
	}
}

@media screen and (min-width: 70rem) {
  .morph-shape {
    height: 80vh;
    right: -13rem;
  }
}
</style>
