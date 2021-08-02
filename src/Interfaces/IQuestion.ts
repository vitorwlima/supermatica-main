import { IAlternative } from './IAlternative'

export interface IQuestion {
  _id: string
  questionText: string
  resolution: string
  tags: string[]
  alternatives: IAlternative[]
}
