import crypto from 'node:crypto'

const generateChecksum = (str: string) => crypto.createHash('sha256').update(str, 'utf8').digest('base64')
const script = `const theme = localStorage.getItem('_cottageTheme')
if (theme) document.documentElement.setAttribute('data-theme', theme)

document.addEventListener('astro:after-swap', () => {
  const theme = localStorage.getItem('_cottageTheme')
  if (theme) document.documentElement.setAttribute('data-theme', theme)
})`

console.info(`sha256-${generateChecksum(script)}`)
