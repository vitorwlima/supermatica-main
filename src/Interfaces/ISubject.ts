import { IQuestion } from '.'

export interface ISubject {
  _id: string
  subjectText: string
  slug: string
  questions: IQuestion[]
}
