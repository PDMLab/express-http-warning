import { ProblemDocument } from 'http-problem-details'
export {}

declare global {
  namespace Express {
    export interface Response<ResBody = any> {
      warn(warnings: ProblemDocument[]): this
    }
  }
}
