---
title: Appending lines to XML
layout: post.hbs
description: Showing how to easily append lines at the end of an XML file.
postDate: 07-27-2017
---

**WIP**: This is currently a public draft of sorts, making me embarassed
about its existance and hopefully urging me to finish it quicker that way.
Check back soon!

PDFs should be in your sitemap, etc.
Explain this snippet:

```
const fs = require('fs');
const path = require('path');
const fileName = 'sitemap.xml';
const closingTag = '</urlset>';

console.log('path test', path.join(__dirname, '..', 'dist', fileName));

let content = `<url> <loc>https://andreasvirkus.me/assets/cv/CV-Andreas-Johan-Virkus.pdf</loc> </url>`,
    buffer = new Buffer(content+ '\n' + closingTag),
    filePath = path.join(__dirname, '..', 'dist', fileName),
    fileSize = fs.statSync(fileName)['size'];

console.log('path:', filePath);

fs.open(filePath, 'r+', (err, fd) => {
    fs.write(fd, buffer, 0, buffer.length, fileSize - closingTag.length, err => {
        if (err) throw err;

        console.log('done');
    });
});
```

<hr>

Down the road, we'll add syntax highlighting with PrismJS to Metalsmith.
