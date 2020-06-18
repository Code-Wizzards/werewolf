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
  }
]



  
app.get('/', (req, res) =>{
  res.send('Hello World!')
})

app.get('/getPlayers', (req, res) => {
  res.send(players)
})

app.get('/getGameState', (req, res) => {
  res.send({players})
})
// not working in postman, but working in game.
app.post('/game/:gameId/registerUser', (req, res) => {
  const gameId = req.params.gameId
  console.log('looking for gameid', gameId)
  const newUser = req.body.data
  const thisGame = games.filter((game) =>  game.gameId === gameId)
  thisGame.players.push(newUser)
  res.sendStatus(200)
  console.log('games', games)
})



app.post('/createNewGame', (req, res) => {
  // const firstUser = req.body.data
  const newGameId = Math.floor(Math.random() * 1000)
console.log('newgameId', newGameId)
console.log('games', games)
  games.push( 
    { id: newGameId, 
      stage: 'lobby', 
      players: []
    })
    console.log('sending to clinet', newGameId)
    res.send({ gameId: newGameId });

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))