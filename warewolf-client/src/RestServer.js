const axios = require('axios')

const serverURL = "http://localhost:3000"

const players = [
  {
    id:1,
    name: "chris"
  },
  {
    id:2,
    name: "lucy"
  },
  {
    id:3,
    name: "anna"
  }
]

export function startGame() {
  return {
    gameID:'123abc',
    state:'lobby'
  }
}

export function joinGame(gameId){
  return {
    gameId,
    state: "lobby",
    players: getPlayers(gameId)
  }
}

export function registerUser(requestedName) {
  const newUser = {
    id: 0,
    name: requestedName
  }
  players.push(newUser)
  return newUser
}

async function getFromServer(path) {
  const res = await axios(serverURL + path, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  })
 
  console.log('received from server', res)
  return res.data
}

export async function getPlayers(gameId) {
  const players = getFromServer('/getPlayers')
  return players
}

export async function fetchGameState() {
  const gameState = getFromServer('/getGameState')
  return gameState
}

export function simulateUsersJoining() {
  let pcount = 5
  setInterval(() => {
    const user = {
      id:++pcount,
      name:`p${pcount}`
    }
    console.log('user joined:', user)
    players.push(user)
  }, 5000);
}
