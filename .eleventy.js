const fs = require('fs')
const dayjs = require('dayjs')
const cssmin = require('clean-css')
const { DateTime } = require('luxon')

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginPWA = require('eleventy-plugin-pwa')
const pluginReadingTime = require('eleventy-plugin-reading-time')
const pluginCacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const outputDirectory = '_site'
const lostPageMessages = [
  `Why, it's obvious, Watson... There's nothing here.`,
  `How did we get here? Is this a Hangover IV in the making?`,
  `Feelin' mighty adventurous, aren't we?`,
  `That's your standard Four-Oh-Four right there, cap'n`,
  `Looks like we've got some broken links. How about you help me fix them?`
]

module.exports = (conf) => {
  conf.addFilter('makeUppercase', (str) => str.toUpperCase())

  conf.addPlugin(pluginRss)
  // conf.addPlugin(pluginPWA)
  conf.addPlugin(pluginSyntaxHighlight, { templateFormats: ["md"] })
  conf.addPlugin(pluginReadingTime)
  conf.setDataDeepMerge(true)
  conf.addLayoutAlias('post', 'layouts/post.njk')
  conf.addPlugin(pluginCacheBuster({ outputDirectory }))

  conf.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy')
  })
  conf.addFilter('coinFlip', () => (Math.floor(Math.random() * 2) == 0))
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  conf.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })
  conf.addFilter('getRandom404Msg', () =>
    lostPageMessages[Math.floor(Math.random() * lostPageMessages.length)])
  conf.addFilter('cssmin', (code) => new cssmin({}).minify(code).styles)

  // Get the first `n` elements of a collection.
  conf.addFilter('head', (array, n) => n < 0
    ? array.slice(n)
    : array.slice(0, n))

  // conf.addCollection('tagList', require('./_11ty/getTagList'))

  conf.addPassthroughCopy('img')
  conf.addPassthroughCopy('css')

  /* Markdown Plugins */
  let markdownIt = require('markdown-it')
  let markdownItAnchor = require('markdown-it-anchor')
  let options = {
    html: true,
    breaks: true,
    linkify: true
  }
  let opts = {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#'
  }

  conf.setLibrary('md', markdownIt(options)
    .use(markdownItAnchor, opts)
  )

  conf.setBrowserSyncConfig({
    callbacks: {
      ready (err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html')

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404)
          res.end()
        })
      }
    }
  })

  return {
    templateFormats: [
      'md',
      'njk',
      'html'
    ],
    pathPrefix: '/',
    markdownTemplateEngine: 'md',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
      output: outputDirectory
    }
  }
}
