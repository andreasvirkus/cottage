const chars = ['*', '+', '·', '°', '.', 'o', '×', ':']

function hash(slug: string): number {
  let h = 2166136261
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let s = seed || 1
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Deterministic ASCII grid, seeded by slug. 4-way mirror so it reads as
// a snowflake-ish artwork on top of the gradient hero. Same output for
// the listing card and the post page, so the pattern persists through
// the view transition.
export function getAsciiSnowflake(slug: string, rows = 12, cols = 60): string {
  const rand = mulberry32(hash(slug || 'cottage'))

  const paletteSize = 3 + Math.floor(rand() * 2)
  const palette: string[] = []
  const pool = [...chars]
  while (palette.length < paletteSize && pool.length) {
    palette.push(pool.splice(Math.floor(rand() * pool.length), 1)[0] ?? '')
  }

  const density = 0.28 + rand() * 0.14

  const halfR = Math.ceil(rows / 2)
  const halfC = Math.ceil(cols / 2)
  const quad: string[][] = []
  for (let r = 0; r < halfR; r++) {
    const row: string[] = []
    for (let c = 0; c < halfC; c++) {
      row.push((rand() < density ? palette[Math.floor(rand() * palette.length)] : '') ?? '')
    }
    quad.push(row)
  }

  const lines: string[] = []
  for (let r = 0; r < rows; r++) {
    const qr = r < halfR ? r : rows - 1 - r
    let line = ''
    for (let c = 0; c < cols; c++) {
      const qc = c < halfC ? c : cols - 1 - c
      line += quad[qr]?.[qc] ?? ''
    }
    lines.push(line)
  }
  return lines.join('\n')
}
