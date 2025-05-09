import 'zx/globals'
import fs from 'fs'
import path from 'path'

const base = 'https://yukkie8058.github.io/slides/'
const slidesDir = './slides'
const distDir = './dist'

fs.rmSync(distDir, { recursive: true, force: true })

fs.readdirSync(slidesDir).forEach(file => {
  const fileName = path.basename(file)
  const slide = path.join(slidesDir, fileName, `${fileName}.md`)
  if (fs.existsSync(slide)) {
    $`slidev build ${slide} \
      --out ${path.resolve(distDir, fileName)} \
      --base ${path.join(base, fileName)} \
    `
  }
});
