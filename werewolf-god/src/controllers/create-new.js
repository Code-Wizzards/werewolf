const { getUniqueRandomNumber } = require('../util/helper-functions')

const {games} = require('../mock-database')

const createNewGame = (req, res) => {
  const newGameId = getUniqueRandomNumber(1200, games.map(game => game.id))
  games.push(
    {
    id: newGameId,
    stage: 'lobby',
    players: []
    })
  res.send({ gameId: newGameId })
}

module.exports = {
  createNewGame
}