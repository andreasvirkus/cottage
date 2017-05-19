const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const postcss = require('metalsmith-postcss');
const autoprefixer = require('metalsmith-autoprefixer');
const cleanCSS = require('metalsmith-clean-css');
const Handlebars = require('handlebars');

Handlebars.registerHelper('is', function (value, test, options) {
    if (value === test) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'Habanero',
            description: "The whimsical recipes and doings of Lia Virkus.",
            generatorname: "Metalsmith",
            generatorurl: "http://metalsmith.io/"
        }
    })
    .source('./src')
    .destination('./dist')
    .clean(false)
    .use(collections({
        posts: {
            pattern: 'posts/*.md',
            sortBy: 'date',
            reverse: true
        },
        pages: {
            pattern: '*.md',
            sortBy: 'menu-order'
        }
    }))
    .use(markdown())
    // Generate ToC
    // .use(tableOfContentsTask())
    .use(permalinks())
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        default: 'default.hbs',
        partials: 'layouts/partials'
    }))
    .use(cleanCSS({
        files: 'assets/css/*.css',
        cleanCSS: {
            rebase: true,
            level: 2
        }
    }))
    .build(function (err) {
        if (err) throw err;
    });
