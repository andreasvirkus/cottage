# andreasvirkus.github.io
## A humble homepage of sorts...

~Metalsmith~ Vuepress setup for my current portfolio-ish site.

Hosted on [Netlify](https://netlify.com).

## Want a site like this?

### Metalsmith

The previous version of this site is still available under [metalsmith-ajv.netlify.com](https://metalsmith-ajv.netlify.com).\
Check out the **[boilerplate repo](https://github.com/andreasvirkus/metalsmith-boilerplate)** or follow this **one-click-wonder-deploy** to
get one yourself:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/andreasvirkus/metalsmith-boilerplate)

### Vuepress (new)
Add `ajv` to your `.vuepress/config.js`'s `theme` parameter. Check out
[the theme](https://github.com/andreasvirkus/vuepress-theme-ajv) for the config
params and details.

----------
### TODO:

- ~~Initial content~~
- ~~Service workers~~
- ~~Sitemap & robots.txt~~
- ~~First posts~~
- ~~Link to [status page](https://status.andreasvirkus.me)~~
- ~~Make dashboard's timeframe dynamic~~
- Update CV
- ~~Refactor to [Vuepress](https://vuepress.vuejs.org/)~~
- Add Keen tracking to Vuepress via npm
  - Add Keen for all pages not just dashboard (but import visualisation only on dashboard page)
- Add jump.js once it's packagised
- Clean up theme package/repo and dogfood it
- Vuetify dashboard.js solution + import keen styles and flexbox grid (or rewrite one)
- Refactor Stylus to native CSS + css custom properties
  - Use CSS custom properties in a proper manner (meaning don't use hover specific variables, etc.);
    this will also ease theming later on (single var for bg colour, font colour, link colour, the works)
  - Refactor to use either scoped styles or CSS modules
  - Add dark theme
- ~~Add vue-tweezing for morphing SVG (menu border)~~
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
- Fine-tune burger animation
- Enhance blog posts
  - Add guesstimated reading time
  - Add prev/next posts

----------
### Roadmap

- ~~Dynamic navigation (Vuepress)~~
    - ~~History API support~~
    - Smooth page transitions (menu overlay into the next page's solid white background)
- ~~Offline support & manifest.json~~
- ~Syntax highlighting if posts get code-heavy (Vuepress)~
- ~~Analytics & dashboard~~
    - ~~Visitor statistics~~
    - Performance metrics
    - ~~Build stats/time~~
- Theming. Since the site is built on CSS custom properties, wouldn't be too much of an effort.
    - LocalStorage/IndexedDB for saving themes
- ~Set up Webpack, since I miss my ES6 modules (Vuepress)~
- ~Metalsmith~ Vue helper for random (or within range) gradient custom properties
- Make CV dynamic
    - ~~Generate CV's PDF from Markdown~~
    - Add custom styles
    - Remove front matter from `.md` before generating `.pdf`
- Gist snippets to Vuepress vault

### Article/blog post/snippet-sharing ideas

- Properly setting selectable text limit (textareas, pre/code blocks, etc.)
- Setting element focus only on tab/keyboard events (better accessibility); event listeners on body (look up from my [Codepen](https://codepen.io/ajv/pen/dMRwyQ))
- Dashboard walkthrough (WIP)
- KeepAlive monitoring (PingPong + Heroku) walkthrough (WIP)
- Snippet: adding event listeners to nodeList ([gist](https://gist.github.com/andreasvirkus/0072d8530ac35e4b99a302196152b123))
- Setting up Metalsmith with StealJS (or Brunch)
- Snippet: adding current section (heading ID/hash) to URL/navbar
- Error handling for SPAs (Vue.js examples) - getting the best of status codes and elegant redirects
- Srcset IE fix with base64 src attr
    ```
    `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">`
    ```
- Adding images to gists
- ES6 template literals http://wesbos.com/template-strings-html/
    ```
    const markup = `
    <ul class="dogs">
        ${dogs.map(dog => `<li>${dog.name} is ${dog.age * 7}</li>`)}
    </ul>
    `;
    ```
- ES6 imports with relative paths (also how to resolve Vue files without extension)
- Gradient animation for any svg [example fiddle](https://jsfiddle.net/andreasvirkus/9jpbw915/)
- pre, code and kbd elements  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
- Generator-based ES6 chatbot
- CSS hacks (amend current hacks pen with tooltip and tabs)
- Rundown of browser APIs (bluetooth, battery, etc.)
- Nifty 'hidden' footers: https://helpie.netlify.com
- Horizontal content/page scrolling by vertical/natural mouse scrolling [my example](https://jsfiddle.net/andreasvirkus/k85fp66y/1/)  [example in the wild](http://tlmagazine.com/jongerius-breathing-colour/)
- Vue-router `<router-back>` link element: [discussion](https://github.com/vuejs/vue-router/issues/880#issuecomment-321190433)
- Delay promise resolvement in dev envs [example](https://gist.github.com/andreasvirkus/e3b2b849ed25fa7c04c0caa3fe14498d) (also add check for NODE_ENV in `wait.js`)
