<template>
  <div class="search-box">
    <input
      @input="query = $event.target.value"
      aria-label="Search"
      :value="query"
      autocomplete="off"
      spellcheck="false"
      ref="input"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
      @keyup.esc="unfocusSearchBox">
    <ul class="suggestions"
      v-if="showSuggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus">
      <li class="suggestion" v-for="(s, i) in suggestions"
        :class="{ focused: i === focusIndex }"
        :key="i"
        @mousedown="go(i)"
        @mouseenter="focus(i)">
        <a :href="s.path" @click.prevent>
          <span class="page-title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      focused: false,
      focusIndex: 0
    }
  },
  computed: {
    showSuggestions () {
      return (
        this.focused &&
        this.suggestions &&
        this.suggestions.length
      )
    },
    suggestions () {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }

      const max = 5
      const { pages } = this.$site
      const matches = item => (
        item.title &&
        item.title.toLowerCase().indexOf(query) > -1
      )
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]

        if (matches(p)) {
          res.push(p)
        } else if (p.headers) {
          // console.log('headers:', p.headers)
          // console.log('tags:', p.tags)
          // TODO: Also search through tags frontmatter on pages
          p.tags && p.headers.join(p.tags)

          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (matches(h)) {
              res.push(Object.assign({}, p, {
                path: p.path + '#' + h.slug,
                header: h
              }))
            }
          }
        }
      }
      return res
    },
    // make suggestions align right when there are not enough items
    alignRight () {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    }
  },
  methods: {
    onUp () {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown () {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go (i) {
      this.$router.push(this.suggestions[i].path)
      this.query = ''
      this.focusIndex = 0
    },
    focus (i) {
      this.focusIndex = i
    },
    unfocus () {
      this.focusIndex = -1
    },
    unfocusSearchBox () {
      this.$refs.input.blur()
    }
  }
}
</script>

<style>
.search-box {
  display: flex;
  position: fixed;
  right: 2rem;
  top: 2rem;
  z-index: 5;
  background-color: var(--menu-overlay);
}
.search-box input {
  width: 0;
  left: 1rem;
  cursor: pointer;
  color: var(--text-color);
  display: inline-block;
  border: none;
  border-bottom: 2px dashed transparent;
  font-size: 0.9rem;
  line-height: 2rem;
  margin-left: auto;
  padding: 0 0.5rem 0 2rem;
  outline: none;
  transition: width 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55), border-color 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background: url("/svg/search.svg") 0.6rem 0.5rem no-repeat;
  background-size: 1rem;
  will-change: width;
}
.search-box input:focus {
  left: 0;
  width: 10rem;
  cursor: auto;
  border-color: rgba(34,34,51,0.596);
}
.search-box .suggestions {
  background: #fff;
  width: 20rem;
  position: absolute;
  top: 1.5rem;
  right: 0;
  box-shadow: 0 2px 10px -4px rgba(0,0,0,0.2);
  padding: 0.4rem;
  list-style-type: none;
}
.search-box .suggestion {
  line-height: 1.4;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  z-index: 5;
}
.search-box .suggestion a {
  color: var(--text-color);
}
.search-box .suggestion a .page-title {
  font-weight: 600;
}
.search-box .suggestion a .header {
  font-size: 0.9em;
  margin-left: 0.25em;
}
.search-box .suggestion.focused {
  background-color: rgba(220,220,220,0.4);
}
.search-box .suggestion.focused a {
  color: var(--accent-color);
}
@media (max-width: 70rem) {
  .search-box .suggestions {
    width: 70vw;
  }
}
</style>
