<template>
  <aside id="menu" class="menu" :class="{ 'menu--open': open }" role="navigation">
    <button class="menu__handle" title="Open menu" @click="open = !open"><span>Menu</span></button>
		<NavLinks />

    <div class="morph-shape" data-morph-open="M300-10c0,0,295,164,295,410c0,232-295,410-295,410" data-morph-close="M300-10C300-10,5,154,5,400c0,232,295,410,295,410">
      <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none">
        <path fill="none" d="M300-10c0,0,0,164,0,410c0,232,0,410,0,410"/>
      </svg>
    </div>
  </aside>
</template>

<script>
// import Snap from '../../../../assets/js/snap.svg.min'
// import menu from '../../../../assets/js/menu'

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
	height: 110vh;
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

.menu__item {
	margin-bottom: 2em;
	font-weight: 600;
	cursor: pointer;
}
.menu__item::before {
	content: ':';
	position: relative;
	display: inline-block;
	top: -1px;
	left: -3px;
	font-weight: 700;
	height: 11px;
	width: 4px;
}

.menu__link {
	position: relative;
	outline: none;
	text-transform: uppercase;
	color: var(--content-color);
	cursor: pointer;
	transition: color 0.1s ease-in-out, opacity 0.1s;
	opacity: 0.6;
}

.menu__item:hover .menu__link {
	opacity: 1;
}
.menu__item[aria-current="page"] .menu__link {
	opacity: 1;
}

.menu__item:first-child::before {
	color: #A6D865;
}
.menu__item:nth-child(2)::before {
	color: #DBD253;
}
.menu__item:nth-child(3)::before {
	color: #F484D4;
}
.menu__item:nth-child(4)::before {
	color: #EF835F;
}
.menu__item:nth-child(5)::before {
	color: #8F6EF4;
}
.menu__item:nth-child(6)::before {
	color: #00A0B0;
}

.menu__handle {
	display: none;
}

.morph-shape {
	position: absolute;
	top: 50%;
	transform: translate(220px, -50%);
	width: 240px;
	height: 80vh;
	right: 0;
	/* Testing new responsive styles */
	height: 90vh;
	top: 48%;
	transition: top .2s, height .2s;
}

.morph-shape path {
	stroke: var(--menu-color);
	stroke-width: 5px;
}

@media screen and (min-width: 67em) {
	.morph-shape {
		pointer-events: none;
	}
}

@media screen and (max-width: 67em) {
	.menu.menu--anim li {
		will-change: transform;
		transform: translateX(0);
	}

	.menu__item {
		will-change: transform;
		transform: translate3d(-160px, 0, 0);
		transition: transform 0.6s;
	}

	.menu__item:first-child {
		transition-delay: 0.3s;
	}
	.menu__item:nth-child(2) {
		transition-delay: 0.25s;
	}
	.menu__item:nth-child(3) {
		transition-delay: 0.2s;
	}
	.menu__item:nth-child(4) {
		transition-delay: 0.15s;
	}
	.menu__item:nth-child(5) {
		transition-delay: 0.1s;
	}
	.menu__item:nth-child(6) {
		transition-delay: 0.05s;
	}

	.menu__handle {
		display: block;
		position: absolute;
		top: -0.5rem;
		left: 190px;
		background-color: transparent;
		width: 30px;
		height: 24px;
		padding: 0;
		border: none;
		outline: none;
		z-index: 9;
		cursor: pointer;
		pointer-events: all;
	}

	.menu__handle::before,
	.menu__handle::after,
	.menu__handle span {
		background-color: var(--menu-color);
		position: absolute;
		height: 3px;
		left: 0;
	}

	.menu__handle::before,
	.menu__handle::after {
		content: '';
		top: 50%;
		transform-origin: 50% 50%;
		transition: transform 0.25s;
	}

	.menu__handle span {
		width: 55%;
		text-indent: 200%;
		color: transparent;
	}

	.menu__handle::before {
		transform: translate3d(0, -8px, 0);
		width: 100%;
	}

	.menu__handle::after {
		transform: translate3d(0, 8px, 0);
		width: 75%
	}

	.menu--open .menu__handle span {
		opacity: 0;
	}

	.menu--open .menu__handle::before {
		transform: rotate3d(0, 0, 1, 45deg);
	}

	.menu--open .menu__handle::after {
		transform: rotate3d(0, 0, 1, -45deg);
		width: 100%;
	}

	.menu:not(.menu--open) {
		pointer-events: none;
	}

	.menu {
		top: 2rem;
		transform: translateX(-160px);
	}
	.sticky + .menu {
		top: 3rem;
	}
	.sticky + .menu .menu__handle {
		top: 2rem;
	}
	/* Testing new responsive styles */
	.sticky + .menu .morph-shape {
		top: 50%;
		height: 80vh;
	}
	.menu.menu--open {
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
</style>
