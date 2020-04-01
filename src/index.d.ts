import { ProblemDocument } from 'http-problem-details'
import http from 'http'

export {}

declare global {
  namespace Express {
    export interface Response<ResBody = any>
      extends http.ServerResponse,
        Express.Response {
      warn(warnings: ProblemDocument[]): this
    }
  }
}
