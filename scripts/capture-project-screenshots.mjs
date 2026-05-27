import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PROJECTS = [
  { slug: "aem-consulting", url: "https://aemconsulting.vercel.app/" },
  { slug: "scale-crm", url: "https://scalecrm.vercel.app/login" },
  { slug: "visa-center", url: "https://visacenter-landing-page.vercel.app/" },
  { slug: "petro-west", url: "https://petrowest.vercel.app/" },
  { slug: "packmad", url: "https://packmadfgdfgdfg.vercel.app/" },
]

const outDirs = [
  path.resolve(__dirname, "../public/projects"),
  path.resolve(__dirname, "../../pluss.dev website/public/projects"),
]

for (const dir of outDirs) {
  fs.mkdirSync(dir, { recursive: true })
}

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
})

for (const project of PROJECTS) {
  const filename = `${project.slug}.png`
  console.log(`Capturing ${project.url} → ${filename}`)

  try {
    await page.goto(project.url, { waitUntil: "networkidle", timeout: 60000 })
    await page.waitForTimeout(2500)

    for (const dir of outDirs) {
      await page.screenshot({
        path: path.join(dir, filename),
        fullPage: false,
      })
    }
    console.log(`  ✓ ${filename}`)
  } catch (error) {
    console.error(`  ✗ Failed ${project.slug}:`, error.message)
  }
}

await browser.close()
console.log("Done.")
