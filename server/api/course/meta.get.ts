import type {
  Course,
  CourseMeta,
  OutlineLesson,
  OutlineChapter
} from '~/types/course'
import course from '~/server/courseData'

course as Course

// just get necessary data
export default defineEventHandler((event): CourseMeta => {
  const outline: OutlineChapter[] = course.chapters.reduce(
    (prev: OutlineChapter[], next) => {
      const lessons: OutlineLesson[] = next.lessons.map((lesson) => ({
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`
      }))

      const chapter: OutlineChapter = {
        title: next.title,
        slug: next.slug,
        number: next.number,
        lessons
      }

      return [...prev, chapter]
    },
    []
  )

  return {
    title: course.title,
    chapters: outline
  }
})
