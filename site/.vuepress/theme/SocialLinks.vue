<template>
    <section class="social">
        <p>Social links</p>
        <ul class="social__list">
            <li class="social__icon" v-for="link in links">
                <a class="social__link fuzzy-interact"
                    :href="link.link"
                    :title="link.title"
                    v-html="link.icon"
                    :rel="link.rel"
                    :type="link.type"></a>
            </li>
        </ul>

        <svg class="fuzzy-filters">
            <filter id="turbulence-1">
                <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
            </filter>

            <filter id="turbulence-2">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" />
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="7" />
            </filter>

            <filter id="turbulence-3">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" />
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
            </filter>

            <filter id="turbulence-4">
                <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" />
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="4" />
            </filter>

            <filter id="turbulence-5">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" />
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="3" />
            </filter>
        </svg>
    </section>
</template>

<script>
export default {
  data () {
      return {
          links: [
              {
                  alt: 'Glimpse at my code(GitHub)',
                  link: 'https://www.github.com/andreasvirkus',
                  icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" version="1.1">
                        <g>
                        <path style=" " d="M 33 29 C 31.203125 29 30 30.515625 30 33 C 30 35.484375 30.890625 38.046875 33 38 C 35.21875 37.949219 36.019531 35.777344 36 33 C 35.984375 30.515625 34.792969 29 33 29 Z M 44.261719 17.066406 C 44.535156 15.722656 44.652344 10.964844 42.679688 6 C 42.679688 6 38.148438 6.496094 31.296875 11.199219 C 29.863281 10.800781 27.429688 10.601563 25 10.601563 C 22.570313 10.601563 20.140625 10.800781 18.699219 11.195313 C 11.851563 6.496094 7.324219 6 7.324219 6 C 5.347656 10.964844 5.445313 15.609375 5.738281 17.066406 C 3.417969 19.585938 2 22.609375 2 26.742188 C 2 44.707031 16.90625 44.996094 20.667969 44.996094 C 21.519531 44.996094 23.210938 44.996094 25 45 C 26.789063 44.996094 28.484375 44.996094 29.332031 44.996094 C 33.09375 44.996094 48 44.707031 48 26.742188 C 48 22.609375 46.582031 19.585938 44.261719 17.066406 Z M 25.140625 43 L 25 43 C 15.570313 43 8.15625 41.660156 8.15625 32.496094 C 8.15625 30.300781 8.933594 28.265625 10.773438 26.574219 C 13.84375 23.753906 19.035156 25.246094 24.929688 25.246094 C 24.953125 25.246094 25.050781 25.246094 25.070313 25.246094 C 30.964844 25.246094 36.160156 23.757813 39.230469 26.574219 C 41.070313 28.265625 41.84375 30.300781 41.84375 32.496094 C 41.84375 41.660156 34.570313 43 25.140625 43 Z M 17 29 C 15.207031 29 14 31.015625 14 33.5 C 14 35.984375 15.207031 38 17 38 C 18.796875 38 20 35.984375 20 33.5 C 20 31.015625 18.796875 29 17 29 Z "></path>
                        </g>
                    </svg>`,
              },
              {
                  alt: 'View my scribblings (Codepen)',
                  link: 'https://codepen.io/ajv/pens/popular/',
                  icon: `
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414">
                        <path d="M15.988 5.443c-.004-.02-.007-.04-.012-.058l-.01-.033c-.006-.017-.012-.034-.02-.05-.003-.012-.01-.023-.014-.034l-.023-.045-.02-.032-.03-.04-.03-.03-.04-.03-.03-.02-.04-.03-.03-.02-.01-.01L8.38.12c-.23-.154-.53-.154-.76 0L.302 4.99.292 5l-.03.023-.04.032-.025.027-.034.037-.024.03-.03.04c-.01.01-.02.02-.02.03l-.03.04-.01.04c-.01.01-.01.03-.02.05l-.01.03c-.01.02-.01.04-.01.06v.03C0 5.5 0 5.53 0 5.56v4.875c0 .03.002.06.006.09l.007.03c.003.02.006.04.013.058l.01.033c.006.018.01.035.018.05l.015.033c0 .01.01.03.02.04l.02.03c.01.01.02.03.03.04l.02.03.03.03c.01.01.01.02.02.02l.04.03.03.02.01.01 7.31 4.88c.11.08.25.11.38.11s.26-.04.38-.12L15.68 11l.01-.01.03-.022.04-.03.03-.026.035-.037.024-.03.03-.04.02-.032.02-.046.01-.036.02-.05.01-.03.02-.05v-5c0-.03 0-.06-.01-.09l-.01-.03zM8 9.626L5.568 8 8 6.374 10.432 8 8 9.626zM7.312 5.18l-2.98 1.993-2.406-1.61 5.386-3.59V5.18zM3.095 8l-1.72 1.15v-2.3L3.095 8zm1.237.828l2.98 1.993v3.21l-5.386-3.59 2.406-1.61zm4.355 1.993l2.98-1.99 2.407 1.61-5.387 3.59v-3.2zM12.905 8l1.72-1.15v2.3L12.905 8zm-1.237-.827L8.688 5.18V1.97l5.386 3.59-2.406 1.61z" fill-rule="nonzero"/>
                    </svg>`,
              },
              {
                  alt: 'See my network (LinkedIn)',
                  link: 'https://www.linkedin.com/in/andreasvirkus',
                  icon: `
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414">
                        <path d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z" fill-rule="nonzero"/>
                    </svg>`,
              },
              {
                  alt: 'Pen pal me (e-mail)',
                  link: 'mailto:write@andreasvirkus.me',
                  icon: `
                    <svg viewBox="0 0 32 32">
                      <g>
                        <path d="M30 1c.6 0 1 .5 1 1v21c0 .5-.4 1-1 1H20l-4 7-4-7H2c-.5 0-1-.5-1-1V2c0-.5.5-1 1-1h28m0-1H2C.953 0 0 .953 0 2v21c0 1.047.953 2 2 2h9.42l3.712 6.496c.178.312.51.504.868.504s.69-.192.868-.504L20.58 25H30c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"></path>
                      </g>
                    </svg>`,
              },
              {
                  alt: 'Hear first of my posts (RSS)',
                  link: '/rss.xml',
                  rel: 'alternate',
                  type: 'application/rss+xml',
                  icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 3 0 C 1.3550302 0 0 1.3550302 0 3 L 0 47 C 0 48.644459 1.3544268 50 3 50 L 47 50 C 48.645063 50 50 48.645063 50 47 L 50 3 C 50 1.3544268 48.644459 0 47 0 L 3 0 z M 3 2 L 47 2 C 47.563541 2 48 2.4355732 48 3 L 48 47 C 48 47.562937 47.562937 48 47 48 L 3 48 C 2.4355732 48 2 47.563541 2 47 L 2 3 C 2 2.4349698 2.4349698 2 3 2 z M 13 8 C 11.591454 8 10.193898 8.1202125 8.84375 8.3125 A 1.0001 1.0001 0 1 0 9.15625 10.28125 C 10.418102 10.101538 11.690546 10 13 10 C 27.95551 10 40 22.028623 40 37 C 40 38.307926 39.899449 39.58079 39.71875 40.84375 A 1.0001 1.0001 0 1 0 41.6875 41.15625 C 41.880801 39.80521 42 38.408074 42 37 C 42 20.953377 29.03049 8 13 8 z M 13 21 C 11.514978 21 10.102821 21.221326 8.75 21.59375 A 1.0004882 1.0004882 0 1 0 9.25 23.53125 C 10.447179 23.201674 11.709022 23 13 23 C 20.76249 23 27 29.229634 27 37 C 27 38.289427 26.800156 39.520807 26.46875 40.71875 A 1.0087508 1.0087508 0 1 0 28.40625 41.28125 C 28.780844 39.927193 29 38.484573 29 37 C 29 28.154366 21.83751 21 13 21 z M 13 32 C 10.24957 32 8 34.246395 8 37 C 8 39.746798 10.246858 42 13 42 C 15.753142 42 18 39.746798 18 37 C 18 34.246395 15.75043 32 13 32 z M 13 34 C 14.67557 34 16 35.321605 16 37 C 16 38.667202 14.672858 40 13 40 C 11.327142 40 10 38.667202 10 37 C 10 35.321605 11.32443 34 13 34 z" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path>
                    </svg>`,
              }
          ]
      }
  }
}
</script>


<style>
.social__list {
    text-align: right;
}

.social__icon {
    display: inline-block;
}
.social__icon + .social__icon {
    margin-left: 2em;
}
.social__link {
    position: relative;
}

.social__link svg {
    width: 30px;
    height: auto;
}
</style>
