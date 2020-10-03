import { RequestHandler } from 'express'
import modify from './modify'
import { registerwarn } from './registerwarn'
export default (): RequestHandler[] => [registerwarn(), modify]
