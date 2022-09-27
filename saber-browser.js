import Wrapper from '@/layouts/Chrome'
import 'prism-themes/themes/prism-shades-of-purple.css'
import '@/css/variables.css'
import '@/css/global.css'
import '@/css/utility.css'

export default ({ router, setHead, setRootComponent }) => {
  setRootComponent(Wrapper)

  // Progress bar is not needed on server-side
  if (process.browser) {
    // These dependencies are only bundled in client build
    const nprogress = require('nprogress')
    require('nprogress/nprogress.css')

    const loaded = Object.create(null)

    router.beforeEach((to, from, next) => {
      if (!loaded[to.path]) {
        // Start progress bar before entering page
        nprogress.start()
      }
      next()
    })

    router.afterEach(to => {
      loaded[to.path] = true
      // Stop progress bar after entering page
      nprogress.done()

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })

    router.scrollBehavior = (to, _from, savedPosition) => {
      if (savedPosition) return savedPosition
      if (to.hash) return { selector: to.hash }
      return { x: 0, y: 0 }
    }
  }

  setHead(() => ({
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Cottage - Thoughts of andreas virkus',
        href: 'https://andreasvirkus.me/rss2.xml'
      }
    ],
    script: [
      {
        vmid: 'themeLoader',
        type: 'text/javascript',
        innerHTML:
          'if (localStorage.getItem("theme")) document.documentElement.dataset.theme = localStorage.getItem("theme")'
      }
    ],
    script: [
      {
        async: true,
        src: 'https://gc.zgo.at/count.js',
        'data-goatcounter': 'https://kano.goatcounter.com/count'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  }))
}
