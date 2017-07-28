const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const autoprefixer = require('metalsmith-autoprefixer');
const sitemap = require('metalsmith-sitemap');
const date = require('metalsmith-build-date');
const rss = require('metalsmith-rss');
const Handlebars = require('handlebars');
const moment = require('moment');
const fs = require('fs');

let buildNumber = 0;

Handlebars.registerHelper('is', (value, test, options) => {
    if (value === test) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('isnot', (value, test, options) => {
    if (value !== test) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('date', date => {
    return moment(date, "MM-DD-YYYY").format('Do MMM \'YY');
});
Handlebars.registerHelper('buildNumber', () => {
    return fs.readFileSync('build-number.txt');
});
Handlebars.registerHelper('buildTime', () => {
    return fs.readFileSync('build-time.txt');
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
        // metalsmith.metadata.buildNumber = buildNumber;

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
    });

// Measure time
var elapsed = process.hrtime(start)[1] / 1000000;

// Save result
fs.writeFile('./build-time.txt', elapsed, err => {
    if (err) throw err;
});
