
const { 
  selectGame, 
  getPlayer, 
  changeGameStage

} = require('../util/helper-functions')

const setRoles = (req, res) => {
  const gameId = req.params.gameId
  const game = selectGame(gameId)


  game.players = req.body.players
  res.status(200).json(game.players)
}

const setStage = (req, res) => {
  changeGameStage(req.params.gameId, req.body.stage)
  const game = selectGame(req.params.gameId)
  res.status(200).json(game.stage)
}

module.exports = {
  setRoles,
  setStage
}