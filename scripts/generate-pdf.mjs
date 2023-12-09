import { chromium } from 'playwright'

const main = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:4321/cv', { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' })

  await page.pdf({
    path: 'public/resume.pdf',
    margin: { top: '0px', bottom: '0px' },
    printBackground: true,
  })

  return browser.close()
}

main()
