<!--
This is a YouTube component that allows you to skip certain parts of the video.

The `videoId` prop is the YouTube video URL.
The `width` and `height` props are the dimensions of the video player.
The `skips` prop is an map object that defines the start and end times of the parts to skip.
For example: { 10: 20 } will skip from 10 seconds to 20 seconds.
-->

<script setup lang="ts">
import { getCurrentInstance, useTemplateRef } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { useSlideContext, onSlideEnter, onSlideLeave } from '@slidev/client'
import * as yt from '@vue-youtube/core'

const { videoId, autoplay = false, width = 560, height = 315, skips = new Map<number, number>() } = defineProps<{
  videoId: string
  autoplay?: boolean
  width?: number
  height?: number
  skips?: Map<number, number>
}>()

const context = getCurrentInstance()!.appContext
if (!(yt.PROVIDE_KEY in context.provides)) {
  context.app.use(yt.createManager())
}

const player = yt.usePlayer(videoId, useTemplateRef('element'), {
  width: width,
  height: height,
  cookie: false,
  playerVars: {
    origin: location.origin,
  },
})

const canAutoPlay = useSlideContext().$renderContext.value === 'slide'
onSlideEnter(() => {
  if (autoplay && canAutoPlay) {
    player.instance.value!.playVideo()
  }
})

onSlideLeave(() => {
  player.instance.value!.stopVideo()
})

const interval = useIntervalFn(() => {
  const instance = player.instance.value!
  const time = instance.getCurrentTime()
  const to = skips.entries().find(([from, to]) => from <= time && time < to)?.[1]
  if (to != null) {
    instance.seekTo(to, true)
  }
}, 0.1, { immediate: false })

player.onStateChange((event) => {
  if (event.data === yt.PlayerState.PLAYING) {
    interval.resume()
  } else {
    interval.pause()
  }
})
</script>

<template>
  <div ref="element" />
</template>
