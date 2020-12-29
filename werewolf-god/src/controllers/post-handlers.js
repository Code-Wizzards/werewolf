const { getUniqueRandomNumber, 
        selectGame, 
        getPlayer, 
        updateGameStage, 
        haveAllPlayersVoted 
      } = require('../util/helper-functions')

const { games } = require('../mock-database')

const registerUser = (req, res) => {
   const gameId = req.params.gameId;
   const requestedName = req.body.data.requestedName;
   if(!requestedName) {
     return res.sendStatus(400)
   }
 
   const newUser = {
     id: getUniqueRandomNumber(1199,
       games.map(game => game.players).map(player => player.id)),
     name: requestedName
   }
 
   const thisGame = selectGame(gameId)
   thisGame.players.push(newUser)
   res.status(200).send(newUser)
}

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

const setStatus = (req, res) => {
   try {
     const gameId = req.params.gameId
     const game = selectGame(gameId)
     const playerId = req.params.playerId
     const player = getPlayer(playerId, game)
     player.status = req.body.data.status
     res.sendStatus(200)
   } catch (err) {
     console.log('Error setting status:', err)
     res.sendStatus(500)
   }
}

const updateIsPlayerAlive = (req, res) => {
   const gameId = req.params.gameId;
   const game = selectGame(gameId);
   const playerId = req.params.userId;
   const player = getPlayer(playerId, game);
 
   if (!player.isPlayerAlive) {
    player.isPlayerAlive = true;
   //  areAllPlayersReady(gameId) // use this for actual game play
    updateGameStage(gameId, 'running') // use this while testing to not have to make all players ready
   } else if (player.isPlayerAlive) {
     player.isPlayerAlive = false;
   }
   res.send(player.isPlayerAlive);
}

const setVote = (req, res) => {   
   const game = selectGame(req.params.gameId);    
   const playerId  = Number(req.params.playerId); 
   const theAccused = game.players.find(player => player.suspected === 'seconded');
   if(playerId === theAccused.id) {
     return res.status(400).send({ error: 'Players cannot vote for themselves'})
   } else {
      const vote = req.body.data.vote;
      const player = getPlayer(playerId, game);
      player.voted = vote; 
      haveAllPlayersVoted(game)
      res.sendStatus(200)
   }
 }

const updatePlayerSuspected = (req, res) => {
   try {
      const game = selectGame(req.params.gameId);    
      const playerId  = req.params.playerId; 
      const player = getPlayer(playerId, game);
      player.suspected = req.body.data.suspected
      if (player.suspected === 'seconded') {
        game.stage = 'voting';
      }
     res.sendStatus(200);
   } catch(err) {
      console.error('error updating player.suspected', err);
      res.sendStatus(500);
    } 
}



 module.exports = {
    registerUser,
    setStatus,
    createNewGame,
    updateIsPlayerAlive,
    setVote,
    updatePlayerSuspected
 }