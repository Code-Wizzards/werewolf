const { games } = require('../mock-database')

function selectGame(gameId) {
   const gameArr = games.filter((game) => game.id == gameId);
   const [selectedGame] = gameArr;
   if(!selectedGame) {
     throw new Error(`No game with id ${gameId} found`)
   }
   return selectedGame;
 }

 function selectPlayer(playerId, gameId) {
   const game = selectGame(gameId)
   const playerArr = game.players.filter((player => player.id == playerId))
   const [player] = playerArr;
   if (!player) {
     throw new Error (`No player with playerId ${playerId} found in game ${gameId}`)
   }
   return player;
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
 
 function getPlayer (playerId, game) {
   const player =  game.players.filter(player => player.id == playerId)[0]
   if (!player) {
     throw new Error(`player with id ${playerId} not found in game ${JSON.stringify(game)}`)
   }
   return player
 }

 function assignRoles (playerList) {
   const numPlayers = playerList.length
   let rolePool = ['werewolf', 'werewolf', 'seer', 'healer']
 
   while (rolePool.length < numPlayers) {
     rolePool.push('villager')
   }
 
   return playerList.map(player => {
     const roleNumber = Math.floor(Math.random() * rolePool.length)
     const role = rolePool[roleNumber]
     rolePool.splice(roleNumber, 1)
     return {...player, role}
   })
 }
 
 function changeGameStage(gameId, newStage) {
   const game = selectGame(gameId);
   game.stage = newStage;
 }
 
 function areAllPlayersReady(gameId) {
   const game = selectGame(gameId);
   const players = game.players;
   const readyPlayers = players.filter(player => player.isPlayerAlive === true);
   if (players.length === readyPlayers.length) {
     changeGameStage(gameId, 'running-day')
   }
 }
 
 function haveAllPlayersVoted(game) {
    const players = game.players;
    const playersVoted = players.filter(player => player.voted);
    if (players.length-1 === playersVoted.length) {
       changeGameStage(game.id, 'vote result')
       voteCount(game)
    }
 }
 
 function voteCount(game) {
    const players = game.players;
    const killCount =  players.reduce((total, player) => {
       if (player.voted === 'kill') { 
          total++
       }
       return total;
      }, 0)
 
    const saveCount =  players.reduce((total, player) => {
       if (player.voted === 'save') { 
          total++
       }
       return total;
       }, 0)
 
    const theAccused = players.find(player => player.suspected === 'seconded');
    if (killCount > saveCount) {
       theAccused.suspected = 'killed';
       theAccused.isPlayerAlive === false;
    } else {
       theAccused.suspected = 'saved'
    }
    console.log({ theAccused }, 'voteCount')
 }

 module.exports = {
    selectGame,
    selectPlayer,
    getUniqueRandomNumber,
    getPlayer,
    assignRoles,
    changeGameStage,
    areAllPlayersReady,
    haveAllPlayersVoted,
    voteCount
 }