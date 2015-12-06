delete process.env.BROWSER

import express from 'express'
import compression from 'compression'

import config from 'config'

const server = express()

if (config.env === 'development') {
  require('middlewares/dev-server')(server)
}

if (config.env === 'production') {
  server.use(compression())
  server.use('/dist', express.static(config.distFolder))
}

server.use(require('middlewares/render'))
server.use('/assets', express.static(config.assetsFolder))

server.listen(config.port, 'localhost', err => {
  if (err) { return console.log(err) }
  console.log(`listening at localhost:${config.port} in ${config.env} mode`)
})
