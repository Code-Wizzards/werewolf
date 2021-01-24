
const { getUniqueRandomNumber, 
  selectGame, 
  getPlayer, 
  changeGameStage, 
  haveAllPlayersVoted, 
  assignRoles,
  selectUser 
} = require('../util/helper-functions')

const setRoles = (req, res) => {
  const gameId = req.params.gameId
  const game = selectGame(gameId)
  const playerId = req.body.id
  const player = getPlayer(playerId, game)
  player.role = req.body.role
  res.status(200).json(game.players)
}

module.exports = {
  setRoles
}