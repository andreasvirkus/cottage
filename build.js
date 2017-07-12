const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const autoprefixer = require('metalsmith-autoprefixer');
const sitemap = require('metalsmith-sitemap');
const Handlebars = require('handlebars');
const moment = require('moment');
const date = require('metalsmith-build-date');
const fs = require('fs');

Handlebars.registerHelper('is', function (value, test, options) {
    if (value === test) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('isnot', function (value, test, options) {
    if (value !== test) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('date', function (date) {
    return moment(date, "MM-DD-YYYY").format('Do MMM \'YY');
});
Handlebars.registerHelper('buildNumber', function () {
    return fs.readFileSync('build-number.txt');
});

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'cave',
            description: "My humble homepage of sorts.",
            generatorname: "Metalsmith",
            generatorurl: "http://metalsmith.io/",
            generatortitle: "Check out Metalsmith!",
            hostname: "Netlify",
            hosturl: "https://netlify.com/",
            hosttitle: "Learn more about Netlify"
        }
    })
    .source('./src')
    .destination('./dist')
    .clean(true)
    .use(date({ key: 'dateBuilt' }))
    // TODO: Create plugin for incrementing build number, add to metadata
    .use(drafts())
    .use(collections({
        posts: {
            pattern: 'thoughts/*.md',
            sortBy: 'date',
            reverse: true
        },
        vault: {
            pattern: 'vault/*.md'
        },
        pages: {
            pattern: '*.md',
            sortBy: 'menu-order'
        }
    }))
    .use(markdown())
    .use(permalinks())
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        default: 'default.hbs',
        partials: 'layouts/partials'
    }))
    .use(autoprefixer())
    .use(sitemap({
        hostname: "https://andreasvirkus.me"
    }))
    .build(function (err) {
        if (err) throw err;
    });
