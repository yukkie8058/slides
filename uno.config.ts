import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: [
    [/^a-br(-m([+-][0-9]*)?)?$/, ([, m, mn]) => {
      const dm = 6, im = parseInt(mn)
      const em = `m-${mn ? !isNaN(im) ? dm + im : mn : dm}`
      return `absolute bottom-0 right-0 ${m ? em : ''}`
    }],
  ],
})
