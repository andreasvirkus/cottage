const fs = require('fs')
const time = require('reading-time')
const dayjs = require('dayjs')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginPWA = require('eleventy-plugin-pwa')
const { DateTime } = require('luxon')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = (conf) => {
  conf.addFilter('makeUppercase', (str) => str.toUpperCase())

  conf.addPlugin(pluginRss)
  conf.addPlugin(pluginSyntaxHighlight)
  conf.setDataDeepMerge(true)

  conf.addLayoutAlias('post', 'layouts/post.njk')

  conf.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy')
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  conf.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })

  // Get the first `n` elements of a collection.
  conf.addFilter('head', (array, n) => {
    if( n < 0 ) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  conf.addCollection('tagList', require('./_11ty/getTagList'))

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
      ready: function(err, browserSync) {
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
      input: 'content',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}
