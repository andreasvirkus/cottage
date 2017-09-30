const metalsmith = require('metalsmith');
const debug = require('metalsmith-debug');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const autoprefixer = require('metalsmith-autoprefixer');
const wordcount = require('metalsmith-word-count');
const sitemap = require('metalsmith-sitemap');
const date = require('metalsmith-build-date');
const rss = require('metalsmith-rss');
const Handlebars = require('handlebars');
const moment = require('moment');
const fs = require('fs');

const appendToSitemap = require('./helpers/appendToSitemap');

let buildNumber = 0;

// Keep 'is' and 'isnot' helpers with ES5 functions since we need 'this' scope
Handlebars.registerHelper('is', function(value, test, options) {
    if (value === test) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('isnot', function(value, test, options) {
    if (value !== test) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('date', date => {
    return moment(date, "MM-DD-YYYY").format('Do of MMMM, YYYY');
});
Handlebars.registerHelper('buildNumber', () => {
    return fs.readFileSync('build-number.txt');
});
Handlebars.registerHelper('buildTime', () => {
    return fs.readFileSync('build-time.txt');
});
Handlebars.registerHelper('format', time => {
    return Math.floor(parseFloat(time) / 100).toFixed(1);
});
Handlebars.registerHelper('titleCase', str => {
    if (typeof str === 'undefined') return '';

    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
});

// Start build timer
let start = process.hrtime();

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
    // Increment build number, add to metadata
    .use((files, metalsmith, done) => {
        buildNumber = parseInt(fs.readFileSync('./build-number.txt'), 10);
        buildNumber++;

        fs.writeFile('./build-number.txt', buildNumber, err => {
            if (err) throw err;
            done();
        });
    })
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
    .use(wordcount({
        raw: true
    }))
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        default: 'default.hbs',
        partials: 'layouts/partials'
    }))
    .use(autoprefixer())
    .use(rss({
        feedOptions: {
            title: 'ajv blog',
            description: 'Blog about nifty development tricks & snippets.',
            site_url: 'https://andreasvirkus.me'
        }
    }))
    .use(sitemap({
        hostname: "https://andreasvirkus.me",
        omitIndex: true
    }))
    .build(function (err) {
        if (err) throw err;

        // Measure time
        const elapsed = process.hrtime(start)[1] / 1000000;

        // Save result
        fs.writeFile('./build-time.txt', elapsed, err => {
            if (err) throw err;
        });

        // Update sitemap
        appendToSitemap(`<url> <loc>https://andreasvirkus.me/assets/cv/CV-Andreas-Johan-Virkus.pdf</loc> </url>`);
    });