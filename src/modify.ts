import * as mung from 'express-mung'

function modify(body, _req, res): any {
  if (res.__warnings) {
    body.warnings = res.__warnings
  }
  return body
}

export default mung.json(modify)
