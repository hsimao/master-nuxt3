import courseData from './courseData'

export interface Lesson {
  title: string
  slug: string
  number: number
  downloadUrl: string
  sourceUrl?: string
  videoId: number
  text: string
  path: string
}

export interface Chapter {
  title: string
  slug: string
  number: number
  lessons: Lesson[]
}

export interface Course {
  title: string
  chapters: Chapter[]
}

export const useCourse = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
    }))
  }))

  return { ...courseData, chapters }
}
