const express = require('express')
var cors = require('cors')

const app = express()
const port = 3000

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



app.get('/', (req, res) =>{
  res.send('Hello World!')
})

app.get('/getPlayers', (req, res) => {

  res.send(players)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))