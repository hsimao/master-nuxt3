<template>
  <div v-if="chapter && lesson">
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.sourceUrl"
        target="_blank"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.downloadUrl"
        target="_blank"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <ClientOnly>
      <LessonCompleteButton
        v-if="user"
        :model-value="isCompleted"
        @update:model-value="toggleComplete"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useCourseProgress } from '~/stores/useCourseProgress'
const user = useSupabaseUser()

// format lesson data
const course = await useCourse()
const route = useRoute()

const { chapterSlug, lessonSlug } = route.params

const lesson = await useLesson(chapterSlug.toString(), lessonSlug.toString())

definePageMeta({
  middleware: [
    async function ({ params }, from) {
      const course = await useCourse()
      const chapter = course.value.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      )

      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: 'Chapter not found'
          })
        )
      }

      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === params.lessonSlug
      )

      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: 'Lesson not found'
          })
        )
      }
    },
    'auth'
  ]
})

const chapter = computed(() => {
  return course.value.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  )
})

// head
const title = computed(() => {
  return lesson.value?.title
    ? `${lesson.value.title} - ${course.value.title}`
    : ''
})

useHead({
  title
})

// progress
const curseProgress = useCourseProgress()
const { initialize, toggleComplete } = curseProgress
initialize()

const isCompleted = computed(() => {
  return (
    curseProgress.progress?.[chapterSlug as string]?.[lessonSlug as string] ||
    false
  )
})
</script>
