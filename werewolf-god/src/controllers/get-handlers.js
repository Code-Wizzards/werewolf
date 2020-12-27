const { selectGame, assignRoles, selectUser } = require('../util/helper-functions')

const getGameState = (req, res) => {
   const gameId = req.params.gameId
   const requestedGame = selectGame(gameId)
   if (!requestedGame) {
     res.status(404).send({ error: `client requested game ${gameId} doesn't exist` })
   } else {
     res.send(requestedGame)
   }
 }

 const startGame = (req, res) => {
   const gameId = req.params.gameId
   const userId = req.params.userId
   const game = selectGame(gameId)
 
   if (!game.stage === 'lobby') {
     res.sendStatus(400)
     return
   }
 
   if (game.players.length < 7) {
     res.status(400).send('You must have at least 7 players to start the game');
     return
   }
 
   game.players = assignRoles(game.players);
   game.stage = 'role assignment';
 
   const userRole = selectUser(userId, gameId).role;
   console.log('players after role assignment', game.players);
 //   res.send(userRole);
 }



 module.exports = {
    getGameState,
    startGame
 }