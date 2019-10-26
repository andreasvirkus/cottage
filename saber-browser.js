import Wrapper from '@/layouts/Chrome'
import 'prismjs/themes/prism-tomorrow.css'
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

    router.scrollBehavior = (to, from, savedPosition) => {
      if (to.hash) {
        return { selector: to.hash }
      } else {
        return { x: 0, y: 0 }
      }
    }
  }

  setHead(vm => ({
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/icons/icon-128x128.png'
      }
    ],
    link: [
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Cottage - Thoughts of andreas virkus',
        href: 'https://andreasvirkus.me/rss2.xml'
      }
    ]
  }))
}
