const path = require('path')

module.exports = {
  title: 'ajv',
  description: 'Homepage of Andreas J Virkus',
  evergreen: true,
  host: 'localhost',
  ga: 'UA-99596348-1',
  // theme: 'ajv',
  serviceWorker: true,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml' }],
    ['meta', { name: 'theme-color', content: '#222233'}],
    ['meta', { name: 'msapplication-TileColor', content: '#222233'}],
    ['meta', { name: 'msapplication-navbutton-color', content: '#222233'}],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/icon-144x144.png' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: '#222233'}],
    ['link', { rel: 'apple-touch-icon-precomposed', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }]
  ],
  themeConfig: {
    repo: 'andreasvirkus/andreasvirkus.github.io',
    docsDir: 'site',
    editLinks: true,
    editLinkText: 'Help me improve this page',
    logo: 'svg/logo.svg',
    titleSeparator: '--',
    generatorUrl: 'https://vuepress.vuejs.org',
    generatorTitle: 'Vue-based static-site generator',
    generatorName: 'Vuepress',
    hostUrl: 'https://netlify.com',
    hostTitle: 'Static sites with superpowers!',
    hostName: 'Netlify',
    lastUpdated: 'Last updated',
    nav: [
      {
        text: '~/',
        link: '/',
      },
      {
        text: 'Me',
        link: '/about/'
      },
      {
        text: 'Stats',
        link: '/dashboard/'
      },
      {
        text: 'Thoughts',
        link: '/thoughts/'
      },
      {
        text: 'Contact',
        link: '/contact/'
      },
    ]
  }
}
