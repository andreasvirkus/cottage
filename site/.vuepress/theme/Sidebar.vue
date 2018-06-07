<template>
  <aside id="menu" class="menu" :class="{ 'menu--open': open }" role="navigation">
    <button class="menu__handle" title="Open menu" @click="open = !open"><span>Menu</span></button>
		<NavLinks @nav="open = false" />

    <div class="morph-shape" data-morph-open="M300-10c0,0,295,164,295,410c0,232-295,410-295,410" data-morph-close="M300-10C300-10,5,154,5,400c0,232,295,410,295,410">
      <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none">
        <path fill="none" d="M300-10c0,0,0,164,0,410c0,232,0,410,0,410"/>
      </svg>
    </div>
  </aside>
</template>

<script>
// import Snap from './snap.svg.min'
// import menu from './menu'
// TODO: Add v-clickaway directive for backdrop
// TODO: Refactor styles

import NavLinks from './NavLinks'
	// Replace morph-shape snap.svg with tweenlite or some other lighter SVG morph lib
	// Look into vue-tweezing!
  export default {
		components: { NavLinks },
		data () {
			return {
				open: false
			}
		}
		// mounted () {
			// menu()
		// }
	}
</script>

<style>
.menu {
	position: fixed;
	height: 90vh;
	top: 5.5rem;
	left: 0;
	z-index: 5;
	transition: transform 0.6s, top .4s;
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

.menu__list {
	list-style: none;
	padding-left: 50px;
	margin: 0;
	width: 180px;
}

.nav__item {
	margin-bottom: 2em;
	cursor: pointer;
}
.nav__item::before {
	content: '≀';
	position: relative;
	font-weight: 800;
	font-size: 2rem;
	padding-bottom: .2em;
}

.nav__item:first-child::before {
	color: #A6D865;
}
.nav__item:nth-child(2)::before {
	color: #DBD253;
}
.nav__item:nth-child(3)::before {
	color: #F484D4;
}
.nav__item:nth-child(4)::before {
	color: #EF835F;
}
.nav__item:nth-child(5)::before {
	color: #8F6EF4;
}
.nav__item:nth-child(6)::before {
	color: #00A0B0;
}
.nav__item:nth-child(7)::before {
	color: #00d2d3;
}

.menu__handle {
	display: none;
}

.morph-shape {
	position: absolute;
	top: 0;
	right: -12rem;
	width: 240px;
	pointer-events: none;
	/* Testing new responsive styles */
	height: 90vh;
	transition: top .2s, height .2s;
}

.morph-shape path {
	stroke: var(--menu-color);
	stroke-width: 5px;
}

@media screen and (max-width: 70rem) {
	.menu.menu--anim li {
		will-change: transform;
		transform: translateX(0);
	}

	.nav__item {
		will-change: transform;
		transform: translate3d(-160px, 0, 0);
		transition: transform 0.6s;
	}

	.nav__item:first-child {
		transition-delay: 0.3s;
	}
	.nav__item:nth-child(2) {
		transition-delay: 0.25s;
	}
	.nav__item:nth-child(3) {
		transition-delay: 0.2s;
	}
	.nav__item:nth-child(4) {
		transition-delay: 0.15s;
	}
	.nav__item:nth-child(5) {
		transition-delay: 0.1s;
	}
	.nav__item:nth-child(6) {
		transition-delay: 0.05s;
	}

	.nav__item::before {
		display: inline-block;
		transform: translateY(2px);
		padding-right: .2em;
	}

	.menu__handle {
		display: block;
		position: absolute;
		top: 0;
		right: -7rem;
		background-color: transparent;
		width: 25px;
		height: 24px;
		padding: 0;
		border: none;
		outline: none;
		z-index: 4;
		cursor: pointer;
		pointer-events: all;
	}

	.menu__handle::before,
	.menu__handle::after,
	.menu__handle span {
		background-color: var(--menu-color);
		position: absolute;
		height: 3px; /* old style */
		height: 2px;
		transition: transform 0.25s ease-in-out 0.3s, width 0.2s ease-in-out 0.2s, opacity 0.4s ease-in-out 0.3s;
		left: 0;
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
		transform: translateX(-170px);
	}
	.sticky + .menu {
		top: 3rem;
	}
	.sticky + .menu .menu__handle {
		top: 2rem;
	}
	/* Testing new responsive styles */
	.sticky + .menu .morph-shape {
		top: 2rem;
		height: 75vh;
	}
	.menu.menu--open,
	.menu.menu--open .nav__item {
		transform: translateX(0);
	}
	.menu__handle span::before {
		content: '';
		background-color: rgba(255, 255, 255, 0.9);
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
		background-color: rgba(255, 255, 255, 0.9);
		pointer-events: inherit;
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
