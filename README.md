# andreasvirkus.github.io
### A humble homepage of sorts...

~Metalsmith~ Vuepress setup for my current portfolio-ish site.

Hosted on [Netlify](https://netlify.com).

#### Want a site like this?

Check out the **[boilerplate repo](https://github.com/andreasvirkus/metalsmith-boilerplate)** or follow this **one-click-wonder-deploy**!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/andreasvirkus/metalsmith-boilerplate)

Vuepress-way:
Add `ajv` to your `.vuepress/config.js` `theme` parameter.

----------
### TODO:

- ~~Initial content~~
- ~~Service workers~~
- ~~Sitemap & robots.txt~~
- ~~First posts~~
- ~~Link to [status page](https://status.andreasvirkus.me)~~
- ~~Make dashboard's timeframe dynamic~~
- ~~Update CV~~
- ~Refactor to [Vuepress](https://vuepress.vuejs.org/)~

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
