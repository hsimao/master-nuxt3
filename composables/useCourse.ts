import type { CourseOutline } from '~/server/api/course/meta.get'

export const useCourse = () =>
  useFetchWithCache<CourseOutline>('/api/course/meta')
