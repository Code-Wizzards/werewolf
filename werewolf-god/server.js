const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express().use(bodyParser.json())
const { assignRoles } = require('./assignRoles')

const port = 3000;

app.use(cors({ //TODO: this will not work when tha app is hosted online.
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
  credentials: true
}))

const players = [ //TODO: not sure we use this but it may be useful to store all the users on the server, so we can assign ids better.
  {
    id: 100,
    name: "chris Server"
  },
  {
    id: 200,
    name: "lucy Server"
  },
  {
    id: 300,
    name: "anna Server"
  },
   {
    id: 400,
    name: "duke"
  },
  {
    id: 500,
    name: "billy"
  },
  {
    id: 600,
    name: "lionel"
  },
  {
  id: 700,
  name: "talulah"
  }
]

// created to push a new game into for create new game process.
const games = [
  {
    id: 123,
    stage: 'lobby',
    players
  }
]


function selectGame(gameId) {
  const gameArr = games.filter((game) => game.id == gameId);
  const [selectedGame] = gameArr;
  if (!selectedGame) {
    throw new Error (`No game with ${gameId} found in gameArr ${games}`)
  }
  return selectedGame;
}

function selectUser(userId, gameId) {
  const game = selectGame(gameId)
  const userArr = game.players.filter((user => user.id == userId))
  const [user] = userArr;
  if (!user) {
    throw new Error (`No user with userId ${userId} found in game ${gameId}`)
  }
  return user;
}

function getUniqueRandomNumber(max, arrayToCheck) {
  let newNumber;
  if (max <= arrayToCheck.length) {
    throw new Error('Pool of numbers exhausted')
  }
  while (!newNumber || arrayToCheck.includes(newNumber)) {
    newNumber = Math.floor(Math.random() * max)
  }
  return newNumber;
}

function getPlayer (playerId, game) {
  const player =  game.players.filter(player => player.id == playerId)[0]
  if (!player) {
    throw new Error(`player with id ${playerId} not found in game ${JSON.stringify(game)}`)
  }
  return player
}

function updateGameStage(gameId, newStage) {
  const game = selectGame(gameId);
  game.stage = newStage;
}

function areAllPlayersReady(gameId) {
  const game = selectGame(gameId);
  const players = game.players;
  const readyPlayers = players.filter(player => player.isPlayerAlive === true);
  if (players.length === readyPlayers.length) {
    updateGameStage(gameId, "running")
  }
//   console.log('players', players)
//   console.log('readyPlayers', readyPlayers)
//   console.log('game.stage', game.stage)
}


app.get('/getPlayers', (req, res) => { //TODO: dont think this is needed
//   console.log('sending players', players)
  res.send(players)
})

app.get('/game/:gameId/getGameState', (req, res) => {
  const gameId = req.params.gameId
  const requestedGame = selectGame(gameId)
  if (!requestedGame) {
    console.log(`client requested game ${gameId} doesn't exist`)
    res.sendStatus(404)
  } else {
    res.send(requestedGame)
  }
})

app.post('/game/:gameId/registerUser', (req, res) => {
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
  res.send(200, newUser)
})



app.post('/game/:gameId/player/:playerId/setStatus', (req, res) => {
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
})

app.post('/createNewGame', (req, res) => {
  newGameId = getUniqueRandomNumber(1200, games.map(game => game.id))
  games.push(
    {
      id: newGameId,
      stage: 'lobby',
      players: []
    })
  console.log('server.js, createnewgame,', games)
  res.send({ gameId: newGameId })
});

app.get('/game/:gameId/user/:userId/startGame',  (req, res) => {
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
});


app.post(`/game/:gameId/user/:userId/updateIsPlayerAlive`, (req, res) => {
  console.log('server- updating isplayeralive')
  const gameId = req.params.gameId;
  const game = selectGame(gameId);
  const playerId = req.params.userId;
  const player = getPlayer(playerId, game);

  if (!player.isPlayerAlive) {
   player.isPlayerAlive = true;
  //  areAllPlayersReady(gameId) // use this for actual game play
   updateGameStage(gameId, "running") // use this while testing to not have to make all players ready
  } else if (player.isPlayerAlive) {
    player.isPlayerAlive = false;
  }

  res.send(player.isPlayerAlive);
});


app.post('/game/:gameId/player/:playerId/playerAccused', (req, res) => {   
  try {
    const game = selectGame(req.params.gameId);    
    const playerId  = req.params.playerId; 
    const player = getPlayer(playerId, game);
    player.accused = true; 
     res.send(200);
  } catch(err) {
    console.error('error accusing player', err);
    res.send(500);
  } 
});

app.post('/game/:gameId/player/:playerId/playerSeconded', (req, res) => {   
   try {
     const game = selectGame(req.params.gameId);    
     const playerId  = req.params.playerId; 
     const player = getPlayer(playerId, game);
     player.seconded = true; 
     game.stage = "voting";
      res.send(200);
   } catch(err) {
     console.error('error seconding player', err);
     res.send(500);
   } 
 });

 app.post('/game/:gameId/player/:playerId/setVote', (req, res) => {   
   const game = selectGame(req.params.gameId);    
   const playerId  = req.params.playerId; 
   const vote = req.body.data.vote;
   const player = getPlayer(playerId, game);
   player.voted = vote; 
   res.send(200)
 });





app.listen(port, () => console.log(`Werewolf server listening on port ${port}`))
  

//TODO choose either 'user' or 'player' and only use one.