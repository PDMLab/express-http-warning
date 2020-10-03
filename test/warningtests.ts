import 'should'
import 'mocha'
import { Response as FetchResponse } from 'node-fetch'

import express, { Request, Response } from 'express'
import { Server } from 'http'
import { ProblemDocument } from 'http-problem-details'
import fetch from 'node-fetch'

import registerwarnings from '../src/registerwarnings'

describe('express-http-warning', (): void => {
  let server: Server

  afterEach((done) => {
    server.close(() => done())
  })
  it('should return warnings', (done) => {
    const app = express()
    app.use(registerwarnings())
    app.get('/', (_req: Request, res: Response) => {
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

    server = app
      .listen(3000, () => {
        fetch('http://localhost:3000/')
          .then((res: FetchResponse) => {
            res.headers
              .get('Content-Warning')
              .should.startWith('"embedded-warning"')
            return res.json()
          })

          .then((json) => {
            json.warnings.should.not.be.null()
            json.warnings.length.should.equal(1)
            json.warnings[0].should.not.be.null()

            json.warnings[0].detail.should.equal(
              'Street name was too long. It has been shortened...'
            )
            done()
          })
      })
      .on('error', (err) => {
        console.log('err', err)
        done()
      })
  })
})
