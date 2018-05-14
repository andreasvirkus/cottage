const path = require('path')

module.exports = {
  title: 'ajv',
  description: 'Homepage of Andreas J Virkus',
  evergreen: true,
  host: 'localhost',
  // theme: 'ajv',
  serviceWorker: true,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon-precomposed', href: '/favicon.png' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml' }],
    ['meta', { 'http-equiv': 'x-ua-compatible', content: 'ie=edge'}],
    ['meta', { name: 'theme-color', content: '#222233'}],
    ['meta', { name: 'msapplication-TileColor', content: '#222233'}],
    ['meta', { name: 'msapplication-navbutton-color', content: '#222233'}],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: '#222233'}]
  ],
  // configureWebpack: {
  //   resolve: {
  //     symlinks: false,
  //     modules: [path.resolve(__dirname, 'node_modules')]
  //   }
  // },
  themeConfig: {
    repo: 'andreasvirkus',
    logo: 'svg/logo.svg',
    titleSeparator: '--',
    generatorUrl: 'https://vuepress.vuejs.org',
    generatorTitle: 'Vue-based static-site generator',
    generatorName: 'Vuepress',
    hostUrl: 'https://netlify.com',
    hostTitle: 'Static sites with superpowers!',
    hostName: 'Netlify',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Me',
        link: '/about'
      },
      {
        text: 'Stats',
        link: '/dashboard'
      },
      {
        text: 'Thoughts',
        link: '/thoughts'
      },
      {
        text: 'Contact',
        link: '/contact'
      },
    ]
  }
}
