import type { CourseOutline } from '~/server/api/course/meta.get'
import { useQuery } from '@tanstack/vue-query'

export const useCourseWithQuery = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['getCourse'],
    queryFn: () =>
      $fetch<CourseOutline>('/api/course/meta', {
        headers: useRequestHeaders(['cookie'])
      })
  })

  const firstLesson = computed(() => {
    if (data.value) {
      return data.value.chapters[0].lessons[0]
    }
    return null
  })

  const firstLessonPath = computed(() =>
    firstLesson.value ? firstLesson.value.path : ''
  )

  return { isLoading, course: data, firstLesson, firstLessonPath }
}
