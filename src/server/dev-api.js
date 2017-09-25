import express from 'express'

import api from 'api'

const server = express()
const port = process.env.DEV_API_PORT || 3001

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.use(api)

server.listen(port, () => {
  console.log(`[api]    listening on port ${port}`) // eslint-disable-line no-console
})
