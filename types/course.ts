export interface Lesson {
  title: string
  slug: string
  number: number
  downloadUrl: string
  sourceUrl?: string
  videoId: number
  text: string
}

export type LessonWithPath = Lesson & {
  path: string
}

export interface Chapter {
  title: string
  slug: string
  number: number
  lessons: Lesson[] | LessonWithPath[]
}

export interface Course {
  title: string
  chapters: Chapter[]
}

type OutlineBase = {
  title: string
  slug: string
  number: number
}

export type OutlineLesson = OutlineBase & {
  path: string
}

export type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[]
}

export type CourseMeta = {
  title: string
  chapters: OutlineChapter[]
}
