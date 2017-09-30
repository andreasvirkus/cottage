const fs = require('fs');
const path = require('path');
const fileName = 'sitemap.xml';
const closingTag = '</urlset>';
const debug = require('debug')('metalsmith-append-sitemap');

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
