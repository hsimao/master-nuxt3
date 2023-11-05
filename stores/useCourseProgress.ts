import { defineStore } from 'pinia'

export const useCourseProgress = defineStore('courseProgress', () => {
  type Progress = { [key: string]: { [key: string]: boolean } }
  const progress = useLocalStorage<Progress>('progress', {})

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

    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug }
      } = useRoute()
      chapter = chapterSlug.toString()
      lesson = lessonSlug.toString()
    }

    // Get the current progress for the lesson
    const currentProgress = progress.value[chapter]?.[lesson]

    // Optimistically update the progress value in the UI
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress
    }

    // TODO: Update in DB (lesson 6-4)
  }

  return { initialize, progress, toggleComplete }
})
