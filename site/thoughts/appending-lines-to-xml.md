---
pageTitle: Appending lines to XML
layout: Post
description: Showing how to easily append lines at the end of an XML file (like your sitemap).
postDate: 2017-09-30
---

So I faced an interesting problem the other day, where
I discovered my CV's downloadable PDF link isn't indexed (aka included in my
`sitemap.xml` file). And it [should be](https://www.thewebmaster.com/seo/2016/feb/24/google-we-index-pdfs-just-like-any-other-web-page/). So we've established that PDFs should end up in our sitemap.

To achieve that, I'll run you through a snippet to append it as an entry to the sitemap.
The way we'll go through this is first set up a basic working node module and
then later (maybe?) also turn it into a Metalsmith plugin (WIP).

We'll need Node's native `fs` and `path` modules and also the file's name
(which you can later make dynamic, but currently we'll settle for the default
`sitemap.xml` value).

```js{4}
const fs = require('fs');
const path = require('path');
const fileName = 'sitemap.xml';
```js{4}

Next we'll define the sitemap's closing tag, so we could replace the length of it
when we write to the file later (you'll hear more 'bout it in a bit).

```js{4}
const closingTag = '</urlset>';
```js{4}

Then we'll go ahead and create a buffer containing our new content (the line
we're appending) and the closing tag we just defined  
...aand also need to know the file's path and size.

```js{4}
let content = `<url> <loc>https://andreasvirkus.me/assets/cv/CV-Andreas-Johan-Virkus.pdf</loc> </url>`,
    buffer = new Buffer(content+ '\n' + closingTag),
    filePath = path.join(__dirname, '..', 'dist', fileName),
    fileSize = fs.statSync(filePath)['size'];
```js{4}

Now all that's left to do is to open up the `XML` file and replace the
end of the file (length of the closing tag) with our freshly defined buffer:

```js{4}
fs.open(filePath, 'r+', (err, fd) => {
    // File was most likely not found or we don't have permission to write
    if (err) throw err;

    fs.write(fd, buffer, 0, buffer.length, fileSize - closingTag.length, err => {
        if (err) throw err;
    });
});
```js{4}

So what we've got so far is this:
```js{4}
// appendToSitemap.js

const fs = require('fs');
const path = require('path');
const fileName = 'sitemap.xml';
const closingTag = '</urlset>';

let content = `<url> <loc>https://andreasvirkus.me/assets/cv/CV-Andreas-Johan-Virkus.pdf</loc> </url>`,
    buffer = new Buffer(content+ '\n' + closingTag),
    filePath = path.join(__dirname, '..', 'dist', fileName),
    fileSize = fs.statSync(filePath)['size'];

fs.open(filePath, 'r+', (err, fd) => {
    fs.write(fd, buffer, 0, buffer.length, fileSize - closingTag.length, err => {
        if (err) throw err;
    });
});
```js{4}

Now we can run it as any other Node script: `node appendToSitemap.js` and
it should add our `content` variable as the last entry of the file's `urlset`.

Since I wish to automate this process, I'll add it to my Metalsmith
build's callback as a module:

```js{4}
const fs = require('fs');
const path = require('path');
const fileName = 'sitemap.xml';
const closingTag = '</urlset>';

module.exports = function(content) {
    let buffer = new Buffer(content+ '\n' + closingTag),
        filePath = path.join(__dirname, '..', 'dist', fileName),
        fileSize = fs.statSync(filePath)['size'];

    fs.open(filePath, 'r+', (err, fd) => {
        fs.write(fd, buffer, 0, buffer.length, fileSize - closingTag.length, err => {
            if (err) throw err;
        });
    });
};
```js{4}

And I can call it in my `build.js` file:

```js{4}
metalsmith(__dirname)
    .source('./src')
    .destination('./dist')
    .clean(true)
    /**
     * Using any amount of plugins here
     * ...
     */
    .build(function (err) {
        if (err) throw err;

        // Update sitemap
        appendToSitemap(`<url> <loc>https://andreasvirkus.me/assets/cv/CV-Andreas-Johan-Virkus.pdf</loc> </url>`);
    });
```js{4}

