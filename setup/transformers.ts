import * as dotenvx from '@dotenvx/dotenvx'
import { defineTransformersSetup, MarkdownTransformContext, MarkdownTransformer } from '@slidev/types'

dotenvx.config({ path: ['.env', '.env.local'] })

export default defineTransformersSetup(() => {
  return {
    pre: [],
    preCodeblock: [
      envTransformer(),
    ],
    postCodeblock: [],
    post: [],
  }
})

function envTransformer(): MarkdownTransformer {
  return (ctx: MarkdownTransformContext) => {
    ctx.s.replaceAll(/%([^ ]+?)%/g, (_, key) => {
      if (typeof key !== 'string') throw new TypeError()
      if (process.env[key] != null) {
        return process.env[key]
      } else {
        console.warn(`Undefined environment variable: ${key}`)
        return ''
      }
    })
  }
}
