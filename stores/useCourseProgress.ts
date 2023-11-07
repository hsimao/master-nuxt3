import { defineStore } from 'pinia'
import type { CourseProgress } from '~/types/course'

export const useCourseProgress = defineStore('courseProgress', () => {
  const progress = ref<CourseProgress>({})

  const initialized = ref(false)

  async function initialize() {
    if (initialized.value) return
    initialized.value = true

    const { data: userProgress } = await useFetch<CourseProgress>(
      '/api/user/progress',
      { headers: useRequestHeaders(['cookie']) }
    )

    if (userProgress.value) {
      progress.value = userProgress.value
    }
  }

  const toggleComplete = async (chapter: string, lesson: string) => {
    // If there's no user we can't update the progress
    const user = useSupabaseUser()
    if (!user.value) return

    const {
      params: { chapterSlug, lessonSlug }
    } = useRoute()

    if (!chapter || !lesson) {
      chapter = chapterSlug.toString()
      lesson = lessonSlug.toString()
    }

    // Get the current progress for the lesson
    const currentProgress = progress.value[chapter]?.[lesson]
    const newProgressStatus = !currentProgress

    // Optimistically update the progress value in the UI
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: newProgressStatus
    }

    try {
      await $fetch(
        `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}/progress`,
        { method: 'POST', body: { completed: newProgressStatus } }
      )
    } catch (error) {
      console.error(error)

      // If the request failed, revert the progress value
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress
      }
    }
  }

  // Calculate complete progress
  const percentageCompleted = computed(() => {
    const chapters = Object.values(progress.value).map((chapter) => {
      const lessons = Object.values(chapter)
      const completedLessons = lessons.filter((lesson) => lesson)

      return Number((completedLessons.length / lessons.length) * 100).toFixed(0)
    })

    const totalLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return number + Object.values(chapter).length
      },
      0
    )

    const totalCompletedLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return number + Object.values(chapter).filter((lesson) => lesson).length
      },
      0
    )

    const course = Number((totalCompletedLessons / totalLessons) * 100).toFixed(
      0
    )

    return { chapters, course }
  })

  return { initialize, progress, toggleComplete, percentageCompleted }
})
