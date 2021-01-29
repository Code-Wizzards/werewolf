const express = require('express')

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

const router = express.Router()


router.get('/:gameId/getGameState', getGameState)
router.get('/:gameId/player/:playerId/startGame', startGame);
router.post('/:gameId/registerPlayer', registerPlayer)
router.post('/:gameId/player/:playerId/setStatus', setStatus)
router.post('/:gameId/player/:playerId/updateIsPlayerAlive', updateIsPlayerAlive);
router.post('/:gameId/player/:playerId/playerSuspected', updatePlayerSuspected)
router.post('/:gameId/player/:playerId/setVote', setVote);
router.post('/:gameId/sunset', sunset)
router.get('/:gameId/player/:playerId/isPlayerWerewolf', isPlayerWerewolf)
router.post('/:gameId/player/:playerId/healPlayer', healPlayer)
router.post('/:gameId/setRoles', setRoles)

module.exports = { router } 