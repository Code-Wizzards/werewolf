const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 ,
  credentials:true}))

const players = [
  {
    id:1,
    name: "chris Server"
  },
  {
    id:2,
    name: "lucy Server"
  },
  {
    id:3,
    name: "anna Server"
  }
]

// created to push a new game into for create new game process.
const games = [
  { id: 123,
    stage: 'lobby',
    players: [
      {
        id:1,
        name: "chris Server in games array"
      },
      {
        id:2,
        name: "lucy Server in games array"
      },
      {
        id:3,
        name: "anna Server in games array"
      }
    ]
  }
]

function selectGame(gameId) {
  const gameArr = games.filter((game) => game.id == gameId);
  const [ selectedGame ] = gameArr;
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

app.get('/', (req, res) =>{
  res.send('Hello World!')
})

app.get('/getPlayers', (req, res) => {
  res.send(players)
})

app.get('/game/:gameId/getGameState', (req, res) => {
  
  const gameId = req.params.gameId
  const thisGame = selectGame(gameId)
  if (!thisGame) {
    console.log(`client requested game ${gameId} doesn't exist`)
    res.send(400)
  } else {
  const players =  selectGame(gameId).players
  res.send({players})
  }
})

app.post('/game/:gameId/registerUser', (req, res) => {
  const gameId = req.params.gameId
  console.log('post register user', gameId)
  const requestedUserName = req.body.data
  const newUser = { id: getUniqueRandomNumber(10000, 
                    games.map(game => game.players).map(player => player.id)),
                    name: requestedUserName 
                   }

  const thisGame = games.filter((game) =>  game.id == gameId)[0] // triple= breaks this
  thisGame.players.push(newUser)
  console.log('newUser in post', newUser)
  res.send(200, newUser)
})


app.post('/createNewGame', (req, res) => {
  newGameId = getUniqueRandomNumber(1000, games.map(game => game.id))   

  games.push( 
    { id: newGameId, 
      stage: 'lobby', 
      players: []
    })
    console.log('server.js, createnewgame,', games)
    
    res.send({ gameId: newGameId });

})

// setInterval(() => {
//   console.log(games[0].players)
// }, 8000)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))