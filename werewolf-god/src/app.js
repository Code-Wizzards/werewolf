const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { createNewGame } = require('./controllers/create-new.js')
const { router: gameRouter } = require('./gameRouter')

const app = express().use(bodyParser.json())

app.use(cors({ //TODO: this will not work when tha app is hosted online.
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
  credentials: true
}))

app.post('/createNewGame', createNewGame);

app.use('/game', gameRouter)

module.exports = app
  

