[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![Join the chat at https://gitter.im/pdmlab/community](https://badges.gitter.im/pdmlab/community.svg)](https://gitter.im/pdmlab/community)

# express-http-warning

Create warnings for HTTP responses in express following RFC [draft-cedik-http-warning-01](https://tools.ietf.org/html/draft-cedik-http-warning-01)

## Usage

You can create warnings using the `.warn` function on the Response object like this:

```typescript
import express, { Request, Response } from 'express'
import { ProblemDocument } from 'http-problem-details'
import registerwarnings from 'express-http-warning/dist/registerwarnings'

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
const server = app.listen(3000)
process.on('SIGINT', () => {
  server.close()
})
```

When calling http://localhost:3000, your output should look like this:

```bash
$ http get http://localhost:3000/

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 209
Content-Type: application/json; charset=utf-8
Content-Warning: "embedded-warning"; 1601818734551
Date: Sun, 04 Oct 2020 13:38:54 GMT
ETag: W/"d1-CjE3r0SHoZBMEN5aorcGVXlp0ac"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "some": "content",
    "warnings": [
        {
            "detail": "Street name was too long. It has been shortened...",
            "instance": "https://example.com/shipments/3a186c51/msgs/c94d",
            "type": "https://example.com/errors/shortened_entry"
        }
    ]
}
```

As you can see, the `warnings` member has been added to the JSON body. Also the `Content-Warning` header has been added.

## Want to help?

This project is just getting off the ground and could use some help with cleaning things up and refactoring.

If you want to contribute - we'd love it! Just open an issue to work against so you get full credit for your fork. You can open the issue first so we can discuss and you can work your fork as we go along.

If you see a bug, please be so kind as to show how it's failing, and we'll do our best to get it fixed quickly.

Before sending a PR, please [create an issue](issues/new) to introduce your idea and have a reference for your PR.

We're using [conventional commits](https://www.conventionalcommits.org), so please use it for your commits as well.

Also please add tests and make sure to run `npm run lint-ts` or `yarn lint-ts`.

## License

MIT License

Copyright (c) 2020 PDMLab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
