const express = require('express')

const { getGameState,
  startGame,
  registerPlayer, 
  setStatus, 
  updateIsPlayerAlive,
  setVote,
  updatePlayerSuspected,
  startNightStage,
  isPlayerWerewolf,
  healPlayer,
  chooseVictim
} = require('./controllers/game')

const { setRoles, setStage } = require('./controllers/dev-helpers')

const router = express.Router()


router.get('/:gameId/getGameState', getGameState)
router.get('/:gameId/player/:playerId/startGame', startGame);
router.post('/:gameId/registerPlayer', registerPlayer)
router.post('/:gameId/player/:playerId/setStatus', setStatus)
router.post('/:gameId/player/:playerId/updateIsPlayerAlive', updateIsPlayerAlive);
router.post('/:gameId/player/:playerId/playerSuspected', updatePlayerSuspected)
router.post('/:gameId/player/:playerId/setVote', setVote);
router.get('/:gameId/startNightStage', startNightStage)
router.post('/:gameId/isPlayerWerewolf', isPlayerWerewolf)
router.post('/:gameId/healPlayer', healPlayer)
router.post('/:gameId/chooseVictim', chooseVictim)

// For development only
router.post('/:gameId/setRoles', setRoles)
router.post('/:gameId/setStage', setStage)

module.exports = { router } 