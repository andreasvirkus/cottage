import crypto from 'node:crypto'

const generateChecksum = (str: string) => crypto.createHash('sha256').update(str, 'utf8').digest('base64')
const script = `const theme = localStorage.getItem('_cottageTheme')
if (theme) document.documentElement.setAttribute('data-theme', theme)
applyCustomTheme()

function applyCustomTheme() {
  const id = localStorage.getItem('_cottageActiveCustomThemeId')
  if (!id) return
  const themes = JSON.parse(localStorage.getItem('_cottageCustomThemes') || '[]')
  const active = themes.find((t) => t.id === id)
  if (!active) return
  document.documentElement.style.setProperty('--custom-bg', active.bg)
  document.documentElement.style.setProperty('--custom-fg', active.fg)
  document.documentElement.style.setProperty('--custom-accent', active.accent)
}

document.addEventListener('astro:after-swap', () => {
  const theme = localStorage.getItem('_cottageTheme')
  if (theme) document.documentElement.setAttribute('data-theme', theme)
  applyCustomTheme()
})`

console.info(`sha256-${generateChecksum(script)}`)
