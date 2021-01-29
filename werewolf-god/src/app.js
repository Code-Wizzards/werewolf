const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { createNewGame } = require('./controllers/create-new.js')

const { getGameState,
        startGame,
        registerPlayer, 
        setStatus, 
        updateIsPlayerAlive,
        setVote,
        updatePlayerSuspected,
        sunset,
        isPlayerWerewolf,
        healPlayer
      } = require('./controllers/game')
      
const { setRoles } = require('./controllers/devHelpers')

const app = express().use(bodyParser.json())

app.use(cors({ //TODO: this will not work when tha app is hosted online.
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
  credentials: true
}))

app.post('/createNewGame', createNewGame);

app.get('/game/:gameId/getGameState', getGameState)

app.get('/game/:gameId/player/:playerId/startGame', startGame);

app.post('/game/:gameId/registerPlayer', registerPlayer)

app.post('/game/:gameId/player/:playerId/setStatus', setStatus)

app.post('/game/:gameId/player/:playerId/updateIsPlayerAlive', updateIsPlayerAlive);

app.post('/game/:gameId/player/:playerId/playerSuspected', updatePlayerSuspected)

app.post('/game/:gameId/player/:playerId/setVote', setVote);

app.post('/game/:gameId/sunset', sunset)

app.get('/game/:gameId/player/:playerId/isPlayerWerewolf', isPlayerWerewolf)

app.post('/game/:gameId/player/:playerId/healPlayer', healPlayer)

app.post('/game/:gameId/setRoles', setRoles)

module.exports = app
  

