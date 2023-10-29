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
