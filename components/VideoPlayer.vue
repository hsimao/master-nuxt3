<template>
  <iframe
    width="500"
    height="315"
    :src="`https://player.vimeo.com/video/${props.videoId}`"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<style scoped></style>

<script setup lang="ts">
const props = defineProps({
  videoId: {
    type: String,
    required: true
  }
})
</script>
