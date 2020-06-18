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


async function sendToServer(path, data) {
   const res = await axios.post(serverURL + path, {
    method: 'POST',
    data: data,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  })
  console.log('received from server', res.data)
  return res.data // need to return something so can send something
} 

export function registerUser(requestedName, gameId) {
  const newUser = {
    id: 0,
    name: requestedName
  }
  console.log('registering users', gameId)
  sendToServer(`/game/${gameId}/registerUser`, newUser)
  return newUser
}

export async function createNewGame() {
  const gameId = await sendToServer('/createNewGame')
  console.log('received game id from server', gameId)
  return gameId
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
  // console.log('received from server', res)
  return res.data
} 


export async function getPlayers(gameId) {
  const players = getFromServer('/getPlayers')
  return players
}



export function fetchGameState() {
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
    console.log(players)
  }, 30000);
}
