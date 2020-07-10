const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express().use(bodyParser.json())

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
  return selectedGame;
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

app.get('/getPlayers', (req, res) => { //TODO: dont think this is needed
  res.send(players)
})

app.get('/game/:gameId/getGameState', (req, res) => {
  const gameId = req.params.gameId
  const thisGame = selectGame(gameId)
  if (!thisGame) {
    console.log(`client requested game ${gameId} doesn't exist`)
    res.sendStatus(400)
  } else {
    const players = selectGame(gameId).players
    res.send({ players })
  }
})

app.post('/game/:gameId/registerUser', (req, res) => {
  const gameId = req.params.gameId
  console.log('post register user', gameId)
  const requestedUserName = req.body.data
  const newUser = {
    id: getUniqueRandomNumber(1199,
      games.map(game => game.players).map(player => player.id)),
    name: requestedUserName
  }

  const thisGame = selectGame(gameId)
  thisGame.players.push(newUser)
  console.log('newUser in post', newUser)
  res.send(200, newUser)
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
})

app.listen(port, () => console.log(`Werewolf server listening on port ${port}`))