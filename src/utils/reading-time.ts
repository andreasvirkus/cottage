import { toString } from 'mdast-util-to-string'

export function remarkReadingTime() {
  return function (tree: any, { data }: any) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    data.astro.frontmatter.readingTime = readingTime
  }
}

const WORDS_PER_MINUTE = 200

export function getReadingTime(content: string) {
  if (!content) return
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '')
  const numberOfWords = clean.split(/\s/g).length
  return Math.ceil(numberOfWords / WORDS_PER_MINUTE)
}
