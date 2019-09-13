const fs = require('fs')
const time = require('reading-time')
const dayjs = require('dayjs')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginPWA = require('eleventy-plugin-pwa')
const { DateTime } = require('luxon')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

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
  conf.addPlugin(pluginSyntaxHighlight)
  conf.setDataDeepMerge(true)
  conf.addLayoutAlias('post', 'layouts/post.njk')

  conf.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy')
  })
  conf.addFilter('coinFlip', () => (Math.floor(Math.random() * 2) == 0))
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  conf.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })
  conf.addFilter('getRandom404Msg', () => lostPageMessages[Math.floor(Math.random() * lostPageMessages.length)])

  // Get the first `n` elements of a collection.
  conf.addFilter('head', (array, n) => {
    if( n < 0 ) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

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
      'html',
      'liquid'
    ],
    pathPrefix: '/',
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_layouts',
      data: '_data',
      output: '_site'
    }
  }
}
