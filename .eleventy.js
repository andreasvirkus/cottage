const fs = require('fs')
const dayjs = require('dayjs')
const cssmin = require('clean-css')
// const htmlmin = require('html-minifier')
const { DateTime } = require('luxon')

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginPWA = require('eleventy-plugin-pwa')
const pluginReadingTime = require('eleventy-plugin-reading-time')
const pluginCacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');
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
  // conf.addPlugin(pluginPWA)
  conf.addPlugin(pluginSyntaxHighlight, { templateFormats: ["md"] })
  conf.addPlugin(pluginReadingTime)
  conf.setDataDeepMerge(true)
  conf.addLayoutAlias('post', 'layouts/post.njk')
  // conf.addPlugin(pluginCacheBuster({ outputDirectory: 'dist' }))

  conf.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLL yyyy')
  })
  conf.addFilter('coinFlip', () => (Math.floor(Math.random() * 2) == 0))
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  conf.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd')
  })
  conf.addFilter('iso', (date) => {
    return DateTime.fromJSDate(date).toISO({
      includeOffset: false,
      suppressMilliseconds: true
    })
  })

  conf.addFilter('getRandom404Msg', () =>
    lostPageMessages[Math.floor(Math.random() * lostPageMessages.length)])
  conf.addFilter('cssmin', (code) => new cssmin({}).minify(code).styles)

  // Get the first `n` elements of a collection.
  conf.addFilter('head', (array, n) => n < 0
    ? array.slice(n)
    : array.slice(0, n))

  // conf.addCollection('tagList', require('./_11ty/getTagList'))

  // Layouts
  conf.addLayoutAlias('base', 'layouts/base.njk')
  conf.addLayoutAlias('page', 'layouts/page.njk')
  conf.addLayoutAlias('post', 'layouts/post.njk')

  // Pass-through files
  conf.addPassthroughCopy('src/manifest.json')
  conf.addPassthroughCopy('src/humans.txt')
  conf.addPassthroughCopy('src/robots.txt')
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

  // config.addTransform('htmlmin', (content, outputPath) => {
  //   if (outputPath.endsWith('.html') && isProduction) {
  //     return htmlmin.minify(content, {
  //       useShortDoctype: true,
  //       removeComments: true,
  //       collapseWhitespace: true
  //     })
  //   }
  //   return content
  // })
  conf.setLibrary('md', markdownIt(options)
    .use(markdownItAnchor, opts))

  // conf.setBrowserSyncConfig({
  //   callbacks: {
  //     ready (err, browserSync) {
  //       const content_404 = fs.readFileSync('dist/404.html')

  //       browserSync.addMiddleware('*', (req, res) => {
  //         // Provides the 404 content without redirect.
  //         res.write(content_404)
  //         res.end()
  //       })
  //     }
  //   }
  // })

  return {
    dir: {
      input: 'src',
      includes: 'includes',
      data: 'data',
      output: 'dist'
    },
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    // dataTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
