import crypto from 'crypto'

const generateChecksum = str =>
  crypto
    .createHash('sha256')
    .update(str, 'utf8')
    .digest('base64')
const script =
  'if (localStorage.getItem("theme")) document.documentElement.dataset.theme = localStorage.getItem("theme")'

console.info(`sha256-${generateChecksum(script)}`)
