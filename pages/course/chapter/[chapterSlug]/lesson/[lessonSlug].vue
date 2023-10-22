<template>
  <h2>Lesson</h2>
  <p>This is a lesson</p>
  <p>{{ chapter && chapter.title }}</p>
  <p>{{ lesson && lesson.title }}</p>
</template>

<script setup lang="ts">
const { params } = useRoute()
const course = useCourse()
console.log('course', course)

const chapter = computed(() => {
  return (
    course.chapters.find((chapter) => chapter.slug === params.chapterSlug) ||
    false
  )
})

const lesson = computed(() => {
  if (!chapter.value) return false
  return chapter.value.lessons.find(
    (lesson) => lesson.slug === params.lessonSlug
  )
})
console.log('lesson', lesson.value)
</script>

<style lang="scss" scoped></style>
