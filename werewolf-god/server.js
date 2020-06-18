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
app.post('/registerUser', (req, res) => {
  const newUser = req.body.data
  players.push(newUser)
 console.log('registering user', players)
})


// getting a CORS error for this
app.post('/createNewGame', (req, res) => {
  const firstUser = req.body.data
  console.log(req.body.data)
  games.push( 
    { id: 124, 
      stage: 'lobby', 
      players: [firstUser]
    })
    const gameId = games[games.length-1].id
    res.send(gameId)
    console.log(gameId)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))