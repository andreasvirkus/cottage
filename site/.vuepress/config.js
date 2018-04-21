module.exports = {
  title: 'ajv',
  description: 'Homepage of Andreas J Virkus',
  evergreen: true,
  // Overwrite dist/ once sitemap and rss are generated
  dest: 'dist',
  theme: 'ajv',
  serviceWorker: true,
  head: [
    ['link', { rel: 'icon', href: `/favicon.png` }]
    // <meta charset="UTF-8" />
    // <title>ajv | {{ title }}</title>
    // <meta http-equiv="x-ua-compatible" content="ie=edge">
    // <meta name="viewport" content="width=device-width, initial-scale=1">
    // <meta name="theme-color" content="#222233">
    // <meta name="msapplication-TileColor" content="#222233">
    // <meta name="msapplication-navbutton-color" content="#222233">
    // <meta name="apple-mobile-web-app-status-bar-style" content="#222233">

    // <link rel="manifest" href="/manifest.json">
    // <link rel="shortcut icon" href="/assets/ico/favicon.png" />
    // <link rel="apple-touch-icon-precomposed" href="/assets/ico/favicon.png">
    // <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
  ],
  themeConfig: {
    repo: 'andreasvirkus/vuepress-theme-ajv',
    logo: 'svg/logo.svg',
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
