import express from 'express'
import bodyParser from 'body-parser'

const api = express.Router()

api.use(bodyParser.json())

api.get('/', (req, res) => res.send(true))

export default api
