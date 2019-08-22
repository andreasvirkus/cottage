# 🏡 Cottage

[![Netlify Status](https://api.netlify.com/api/v1/badges/3c4e0613-7ab3-4343-957d-ff778c957fcd/deploy-status)](https://app.netlify.com/sites/ajv/deploys)

[![forthebadge](https://forthebadge.com/images/badges/contains-technical-debt.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)

## A humble homepage of sorts...

~~Metalsmith~~ [Vuepress](https://vuepress.vuejs.org) setup for my current portfolio-ish site.

Hosted on [Netlify](https://netlify.com).

## Want a site like this?

### Metalsmith (legacy)

The previous version of this site is still available under [metalsmith-ajv.netlify.com](https://metalsmith-ajv.netlify.com).\
Check out the **[boilerplate repo](https://github.com/andreasvirkus/metalsmith-boilerplate)** or follow this **one-click-wonder-deploy** to
get one yourself:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/andreasvirkus/metalsmith-boilerplate)

### Vuepress (new)
Add `ajv` to your `.vuepress/config.js`'s `theme` parameter. Head over to
[vuepress-theme-ajv](https://github.com/andreasvirkus/vuepress-theme-ajv)'s repo for the config
params and details.

----------
### TODO:

- ~~Initial content~~
- ~~Service workers~~
- ~~Sitemap, humans.txt & robots.txt~~
- ~~First posts~~
- ~~Link to [status page](https://status.andreasvirkus.me)~~
- ~~Make dashboard's timeframe dynamic~~
- ~~Update CV~~
- ~~Refactor to [Vuepress](https://vuepress.vuejs.org/)~~
- Add Keen tracking to Vuepress
  - ~~Add Keen for all pages not just dashboard - solved via lovely Netlify post-processing~~
  - Import visualisation only on dashboard page
- Add jump.js once it's packagised
- Clean up theme package/repo and dogfood it
- ~~Vue up the dashboard.js solution + import keen styles and flexbox grid~~
- Rewrite custom flexbox grid and more lightweight styles for dashboard boxes
- Refactor Stylus to native CSS + css custom properties
  - Use CSS custom properties in a proper manner (meaning don't use hover specific variables, etc.);
    this will also ease theming later on (single var for bg colour, font colour, link colour, the works)
  - Refactor to use either scoped styles or CSS modules
  - Add dark theme
- ~~Add vue-tweezing for morphing SVG (menu border)~~
- Update to Vuepress v1
- Add page transitions
- Add tags support in page frontmatter and use it in search results
- Add theme customiser
- Add build-specific statistics
  - no. of times built
  - latest build (get touch date of times built tracker file)
  - avg build time
  - bundle/site filesize, etc.)
- Generate sitemap
- ~~Add contact form to /contact~~
- ~~Prettify permalinks~~
- Fine-tune burger animation (gooey line transition/bounce)
- ~~Enhance blog posts~~
  - ~~Add guesstimated reading time~~
  - ~~Add prev/next posts~~
- ~~Add ASCII message to source (Netlify post processing <3 )~~

----------

### Roadmap

- ~~Dynamic navigation (Vuepress)~~
    - ~~History API support~~
    - Smooth page transitions (menu overlay into the next page's solid white background)
- ~~Offline support & manifest.json~~
- ~~Syntax highlighting if posts get code-heavy (Vuepress)~~
- ~~Analytics & dashboard~~
    - ~~Visitor statistics~~
    - Performance metrics
    - ~~Build stats/time~~
- Theming. Since the site is built on CSS custom properties, wouldn't be too much of an effort.
    - LocalStorage/IndexedDB for saving themes
- ~~Set up Webpack, since I miss my ES6 modules (Vuepress)~~
- ~~Metalsmith~~ Vue helper for random (or within range) gradient custom properties
- Make CV dynamic
    - ~~Generate CV's PDF from Markdown~~
    - Add custom styles
    - Remove front matter from `.md` before generating `.pdf`
- Gist snippets to Vuepress vault
