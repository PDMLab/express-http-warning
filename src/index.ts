import { ProblemDocument } from 'http-problem-details'

export function warn(warnings: ProblemDocument[]): Express.Response {
  this.__warnings = warnings
  this.set('Content-Warning', `"embedded-warning"; ${Date.now()}`)
  return this
}
