import { StorageSerializers } from '@vueuse/core'
import type { LessonWithPath } from '~/types/course'

export const useLesson = async (chapterSlug: string, lessonSlug: string) => {
  // use sessionStorage cache api lesson data
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  const lesson = useSessionStorage<LessonWithPath>(url, null, {
    serializer: StorageSerializers.object
  })

  if (lesson.value) {
    console.log(
      `Getting lesson ${lessonSlug} in chapter ${chapterSlug} from cache`
    )
    return lesson
  }

  const { data, error } = await useFetch<LessonWithPath>(url)

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`
    })
  }

  lesson.value = data.value

  return lesson
}
