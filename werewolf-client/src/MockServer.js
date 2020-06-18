
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

export function getPlayers(gameId) {
  return players
}

export function fetchGameState() {
  return { players }
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
