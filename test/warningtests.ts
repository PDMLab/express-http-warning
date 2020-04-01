import * as should from 'should'
import { warn } from '../src/index'
import modify from '../src/modify'
import express from 'express'
import { ProblemDocument } from 'http-problem-details'
import { Server } from 'http'
import fetch from 'node-fetch'
require('should')

function warn1() {
  return (_req: any, res: any, next) => {
    res.warn = warn
    return next()
  }
}

describe('warn', () => {
  const app = express()
  app.use([warn1(), modify])
  let server: Server
  it('should say name', async () => {
    try {
      app.get('/', (req, res, next) => {
        const response = res
        return res
          .status(200)
          .warn([
            new ProblemDocument({
              detail: 'Street name was too long. It has been shortened...',
              instance: 'https://example.com/shipments/3a186c51/msgs/c94d',
              type: 'https://example.com/errors/shortened_entry'
            })
          ])
          .send({ some: 'content' })
      })
      server = app.listen(3000)
      const res = await fetch('http://localhost:3000/')
      const body = await res.json()
      body.some.should.equal('content')
      console.log(body)
      console.log(res.headers)
    } finally {
      server.close()
      // done()
    }
  })
})
