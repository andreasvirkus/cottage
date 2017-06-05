# andreasvirkus.github.io
### A humble landing page of sorts...

Metalsmith setup for my current portfolio-ish site.

Since Github doesn't let you use a subdir for your static site
(and the gh-pages hack `git subtree push --prefix dist origin gh-pages`
doesn't work with user pages), this is hosted on [Netlify](https://netlify.com).

----------
### TODO:

- Content
- ~~Sitemap & robots.txt~~
- First posts
- Link to [status page](https://status.andreasvirkus.me)
- ~Make dashboard's timeframe dynamic~

----------
### Roadmap

- ~~Dynamic navigation (Pjax)~~
    - ~~History API support~~
    - Smooth page transitions (menu overlay into the next page's solid white background)
    - Swap pjax for [Barba](https://github.com/luruke/barba.js)
- ~~Offline support & manifest.json~~
- Syntax highlighting if posts get code-heavy
- Analytics & dashboard (visitor statistics & performance metrics)
- Theming? Since the site is built on CSS custom properties, wouldn't be too much of an effort.
    - LocalStorage/IndexedDB for saving themes
- Set up Webpack, since I miss my ES6 modules
- [Partial rebuilds](http://www.mograblog.com/2016/11/speed-up-metalsmith.html) with Chokidar
- Metalsmith helper for random (or within range) gradient custom properties.
- Generate CV file's PDF from Markdown (using [markdown-pdf](https://www.npmjs.com/package/markdown-pdf) or similar)


[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/andreasvirkus/metalsmith-boilerplate)
