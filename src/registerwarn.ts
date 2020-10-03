import { RequestHandler } from 'express-serve-static-core'
import { ProblemDocument } from 'http-problem-details/dist/ProblemDocument'

export function registerwarn(): RequestHandler {
  return function (_req, res: Express.Response, next) {
    res.warn = (warnings: ProblemDocument[]): Express.Response => {
      const response = res as any
      response.__warnings = warnings
      response.set('Content-Warning', `"embedded-warning"; ${Date.now()}`)
      return res
    }
    return next()
  }
}
