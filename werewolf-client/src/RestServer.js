const axios = require('axios')

const hostURL = window.location.host 
const serverURL = process.env.NODE_ENV === 'production' ? `http://${hostURL}/api` : 'http://localhost:3000'

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

// export function startGame() {
//   return {
//     gameID:'123abc',
//     state:'lobby'
//   }
// }

export function joinGame(gameId){ //TODO: this should call out to the server to see if that game exists or not
  const checkGame = fetchGameState(gameId);
  if (checkGame) {
    return {
      gameId,
      stage: "lobby",
      players: getPlayers(gameId)
    }
  } else {
   
     
    
  }
}

export function setPlayerStatus(playerId, gameId, status) {
  const data = {status}
  sendToServer(`/game/${gameId}/player/${playerId}/setStatus`, data);
}

async function sendToServer(path, data) {
  const res = await axios.post(serverURL + path, {
    method: 'POST',
    data,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  })
  // console.log('received from server', res.data)
  return res.data // need to return something so can send something
} 

export function registerUser(requestedName, gameId) {
  const newUser = sendToServer(`/game/${gameId}/registerUser`, {requestedName});
  console.log('registeruser', newUser)
  return newUser;
}

export async function createNewGame() {
  const gameId = await sendToServer('/createNewGame');
  return gameId;
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
  if (res.status === 200) {
    return res.data
  } else {
    throw new Error('Could not get game state from server: received status code' + res.status)
  }
} 

export async function getPlayers(gameId) {
  const players = getFromServer('/getPlayers')
  return players
}

export function fetchGameState(gameId) {
  const gameState = getFromServer(`/game/${gameId}/getGameState`) // rpoblem with referencing gameid sometimes its an object, other times not
    return gameState
}

export function simulateUsersJoining() {
  let pcount = 5
  setInterval(() => {
    const user = {
      id:++pcount,
      name:`p${pcount}`
    }
    // console.log('user joined:', user)
    players.push(user)
    // console.log(players)
  }, 30000);
}


export async function startGame(gameId, userId) {
 try {
   const  userRole  = await getFromServer(`/game/${gameId}/user/${userId}/startGame`);
   return userRole;
 } catch(err) {
    alert(err.response.data)
 }
}

export async function updateIsPlayerAlive(gameId, userId) {
 const isPlayerAlive = await sendToServer(`/game/${gameId}/user/${userId}/updateIsPlayerAlive`);
  return isPlayerAlive;
 }

 export function playerAccused(gameId, playerId) {
  sendToServer(`/game/${gameId}/player/${playerId}/playerAccused`);
 }

 export function playerSeconded(gameId, playerId) {
   sendToServer(`/game/${gameId}/player/${playerId}/playerSeconded`);
  }