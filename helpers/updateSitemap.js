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