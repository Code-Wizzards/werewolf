const axios = require('axios')

const hostURL = window.location.host 
const serverURL = process.env.NODE_ENV === 'production' ? `http://${hostURL}/api` : 'http://localhost:3000'

const players = [
  {
    id:1,
    name: 'chris'
  },
  {
    id:2,
    name: 'lucy'
  },
  {
    id:3,
    name: 'anna'
  }
]

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
  if (res.status > 300) {
    throw new Error('Error sending to server, received code:', res.status)
  }
  return res.data // need to return something so can send something
} 

export async function joinGame(gameId){ 
  const checkGame = await fetchGameState(gameId);
  if (checkGame.error) {
    return {
       error: { message: `Game with id ${gameId} not found`}
    } 
  } else if (checkGame.stage !== 'lobby') {
      return {
         error: { message: `Sorry, you can't join a game that's already running` }
      }
  } else {
   return {
      gameId,
      stage: 'lobby',
     
    }
  }
}

export function setPlayerStatus(playerId, gameId, status) {
  const data = {status}
  sendToServer(`/game/${gameId}/player/${playerId}/setStatus`, data);
}



export function registerPlayer(requestedName, gameId) {
  const newPlayer = sendToServer(`/game/${gameId}/registerPlayer`, {requestedName});
  console.log('registerPlayer', newPlayer)
  return newPlayer;
}

export async function createNewGame() {
  const gameId = await sendToServer('/createNewGame');
  return gameId;
}

async function getFromServer(path) {
   try{
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
    return res.data
   } catch (error) {
         console.log(error.response.data)
         return error.response.data
    } 
}

// export async function getPlayers(gameId) {
//   const players = getFromServer('/getPlayers')
//   return players
// }

export async function fetchGameState(gameId) {
  const gameState = await getFromServer(`/game/${gameId}/getGameState`) // rpoblem with referencing gameid sometimes its an object, other times not
  return gameState
}

export function simulatePlayersJoining() {
  let pcount = 5
  setInterval(() => {
    const Player = {
      id:++pcount,
      name:`p${pcount}`
    }
    // console.log('Player joined:', Player)
    players.push(Player)
    // console.log(players)
  }, 30000);
}


export async function startGame(gameId, playerId) {
  const res =  await getFromServer(`/game/${gameId}/player/${playerId}/startGame`)
  return res
}

export async function updateIsPlayerAlive(gameId, playerId) {
 const isPlayerAlive = await sendToServer(`/game/${gameId}/player/${playerId}/updateIsPlayerAlive`);
  return isPlayerAlive;
 }

 export function playerAccused(gameId, playerId) {
  sendToServer(`/game/${gameId}/player/${playerId}/playerSuspected`, { suspected: 'accused' });
 }

 export function playerSeconded(gameId, playerId) {
   sendToServer(`/game/${gameId}/player/${playerId}/playerSuspected`, { suspected: 'seconded' });
  }

  export function setVote(gameId, playerId, vote ) {
     sendToServer(`/game/${gameId}/player/${playerId}/setVote`, {vote})
  }

  export function sunset(gameId) {
    sendToServer(`/game/${gameId}/sunset`)
  }

  export async function isPlayerWerewolf(gameId, playerId) {
   const answer =  await getFromServer(`/game/${gameId}/player/${playerId}/isPlayerWerewolf`)
   return answer
  }

  export async function healPlayer(gameId, playerId) {
    const result = await sendToServer(`/game/${gameId}/player/${playerId}/healPlayer`)
    return result
  }