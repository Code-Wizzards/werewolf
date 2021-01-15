const { getUniqueRandomNumber, 
  selectGame, 
  getPlayer, 
  changeGameStage, 
  haveAllPlayersVoted, 
  assignRoles,
  selectUser 
} = require('../util/helper-functions')

const { games } = require('../mock-database')

const getGameState = (req, res) => {
   const gameId = req.params.gameId
   const requestedGame = selectGame(gameId)
   if (!requestedGame) {
     res.status(404).send({ error: `client requested game ${gameId} doesn't exist` })
   } else {
     res.status(200).send(requestedGame)
   }
 }

 const startGame = (req, res) => {
   const gameId = req.params.gameId
   const userId = req.params.userId
   const game = selectGame(gameId)
 
   if (game.stage !== 'lobby') {
     res.sendStatus(400)
     return
   
   }
 
   if (game.players.length < 7) {
     res.status(400).send({ error: 'You must have at least 7 players to start the game' });
     return
   }
 
   game.players = assignRoles(game.players);
   game.stage = 'role assignment';
 
   // const userRole = selectUser(userId, gameId).role;
   
   res.sendStatus(200)
 }


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
   changeGameStage(gameId, 'running-day') // use this while testing to not have to make all players ready
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

const sunset = (req, res) => {
  const { gameId } = req.params
  const game = selectGame(gameId)
  changeGameStage(gameId, 'running-night')
  game.players.forEach(player => {
    player.suspected = ""
    player.voted = ""
  })
  console.log('sunset', game.players, game.stage)
  res.sendStatus(200)
}

const isPlayerWerewolf = (req, res) => {
  const game = selectGame(req.params.gameId)
  const id = parseInt(req.params.playerId, 10)
  const requestedPlayer = game.players.find(player => player.id === id)
  const answer = requestedPlayer.role === 'werewolf'
  res.status(200).json({answer})
}

const healPlayer = (req, res) => {
  const game = selectGame(req.params.gameId)
  const id = parseInt(req.params.playerId, 10)
  const playerToHeal =  game.players.find(player => player.id === id)
  playerToHeal.protected = true
  res.status(200).json({ playerToHeal })
}

module.exports = {
  registerUser,
  setStatus,
  updateIsPlayerAlive,
  setVote,
  updatePlayerSuspected,
  getGameState,
  startGame,
  sunset,
  isPlayerWerewolf,
  healPlayer
}

