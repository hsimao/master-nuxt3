import type { CourseMeta } from '~/types/course'

export const useCourse = () => useFetchWithCache<CourseMeta>('/api/course/meta')
