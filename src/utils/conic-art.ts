// Generate a random conic-gradient background based on post slug
export function getConicGradient(slug: string) {
  const colors = [
    '#FEB2B2',
    '#FBD38D',
    '#FDE047',
    '#86EFAC',
    '#63B3ED',
    '#A78BFA',
    '#F472B6',
    '#9198E5',
    '#E66465',
    '#F69D3C',
  ]
  const cutoff = colors.length - 1
  // const degree = getRandomInteger(30, 100)
  const flipDegree = Math.random() > 0.5 ? -1 : 1
  const degree = getRandomInteger(1, 4) * 22 * flipDegree
  const baseColor = colors[slug.length % cutoff]
  let contrastIdx = Math.round((slug.length * 4) % cutoff)

  if (contrastIdx === slug.length % cutoff) contrastIdx = contrastIdx + (1 % cutoff)
  const contrastColor = colors[contrastIdx]

  return `conic-gradient(${baseColor} ${degree}%${contrastColor ? ', ' + contrastColor : ''})`
}

function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
