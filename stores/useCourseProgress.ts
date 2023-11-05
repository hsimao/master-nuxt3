import { defineStore } from 'pinia'

export const useCourseProgress = defineStore('courseProgress', () => {
  type Progress = { [key: string]: { [key: string]: boolean } }
  const progress = ref<Progress>({})

  const initialized = ref(false)

  async function initialize() {
    if (initialized.value) return
    initialized.value = true

    // / TODO: Fetch user progress from endpoint (lesson 6-5)
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
        { method: 'POST', body: { computed: newProgressStatus } }
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

  return { initialize, progress, toggleComplete }
})
