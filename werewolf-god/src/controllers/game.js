const { getUniqueRandomNumber,
  selectGame,
  getPlayer,
  changeGameStage,
  haveAllPlayersVoted,
  assignRoles,
  areAllNightActionsCompleted,
} = require('../util/helper-functions')

const { games } = require('../mock-database')

const getGameState = (req, res) => {
  const gameId = req.params.gameId
  const requestedGame = selectGame(gameId)
  if (!requestedGame) {
    res.status(404).send({ error: `client requested game ${gameId} doesn't exist` })
  } else {
    res.status(200).send(requestedGame)
  }
}

const startGame = (req, res) => {
  const gameId = req.params.gameId
  const game = selectGame(gameId)

  if (game.stage !== 'lobby') {
    res.sendStatus(400)
    return

  }

  if (game.players.length < 7) {
    res.status(400).send({ error: 'You must have at least 7 players to start the game' });
    return
  }

  game.players = assignRoles(game.players);
  game.stage = 'role assignment';
  console.log(game.players)
  res.sendStatus(200)
}


const registerPlayer = (req, res) => {
  const gameId = req.params.gameId;
  const requestedName = req.body.data.requestedName;

  if (!requestedName) {
    return res.sendStatus(400)
  }

  const newPlayer = {
    id: getUniqueRandomNumber(1199,
        games.map(game => game.players).map(player => player.id)),
    name: requestedName,
    role: null,
    isPlayerAlive: false,
    voted:  null,
    suspected: null,
    protected: false,
    nightActionCompleted: false,
    victimId: 0,
    killedByWolf: null,
  }

  const thisGame = selectGame(gameId)
  thisGame.players.push(newPlayer)
  res.status(200).send(newPlayer)
}

const setStatus = (req, res) => {
  try {
    const gameId = req.params.gameId
    const game = selectGame(gameId)
    const playerId = req.params.playerId
    const player = getPlayer(playerId, game)
    player.status = req.body.data.status
    res.sendStatus(200)
  } catch (err) {
    console.log('Error setting status:', err)
    res.sendStatus(500)
  }
}

const updateIsPlayerAlive = (req, res) => {
  const gameId = req.params.gameId;
  const game = selectGame(gameId);
  const playerId = req.params.playerId;
  const player = getPlayer(playerId, game);

  if (!player.isPlayerAlive) {
    player.isPlayerAlive = true;
    //  areAllPlayersReady(gameId) // use this for actual game play
    changeGameStage(gameId, 'running-day') // use this while testing to not have to make all players ready
  } else if (player.isPlayerAlive) {
    player.isPlayerAlive = false;
  }
  res.status(200).send(player.isPlayerAlive);
}

const setVote = (req, res) => {
  const game = selectGame(req.params.gameId);
  const playerId = Number(req.params.playerId);
  const theAccused = game.players.find(player => player.suspected === 'seconded');
  if (playerId === theAccused.id) {
    return res.status(400).send({ error: 'Players cannot vote for themselves' })
  } else {
    const vote = req.body.data.vote;
    const player = getPlayer(playerId, game);
    player.voted = vote;
    haveAllPlayersVoted(game)
    res.sendStatus(200)
  }
}

const updatePlayerSuspected = (req, res) => {
  try {
    const game = selectGame(req.params.gameId);
    const playerId = req.params.playerId;
    const player = getPlayer(playerId, game);
    player.suspected = req.body.data.suspected
    if (player.suspected === 'seconded') {
      game.stage = 'voting';
    }
    res.sendStatus(200);
  } catch (err) {
    console.error('error updating player.suspected', err);
    res.sendStatus(500);
  }
}

const startNightStage = (req, res) => {
  const { gameId } = req.params
  const game = selectGame(gameId)
  changeGameStage(gameId, 'running-night')
  game.players.forEach(player => {
    player.suspected = ""
    player.voted = ""
  })
  res.sendStatus(200)
}

const isPlayerWerewolf = (req, res) => {
  const game = selectGame(req.params.gameId)
  const { playerToCheckId, playerId } = req.body.data
  const playerToCheck = getPlayer(playerToCheckId, game)
  const result = playerToCheck.role === 'werewolf'
  const thisPlayer = getPlayer(playerId, game)
  thisPlayer.nightActionCompleted = true
  areAllNightActionsCompleted(game)
  res.status(200).json(result)
}

const healPlayer = (req, res) => {
  const game = selectGame(req.params.gameId)
  const { playerToHealId, playerId } = req.body.data
  const playerToHeal = getPlayer(playerToHealId, game)
  const thisPlayer = getPlayer(playerId, game)
  playerToHeal.protected = true
  thisPlayer.nightActionCompleted = true
  res.sendStatus(200)
}

const chooseVictim = (req, res) => {
  const game = selectGame(req.params.gameId)
  const { playerId, victimId } = req.body.data
  const thisPlayer = getPlayer(playerId, game)
  thisPlayer.victimId = victimId
  areAllNightActionsCompleted(game)
  res.sendStatus(200)
}

const killVictim = (req, res) => {
  const game = selectGame(req.params.gameId)
  const { victimId, playerId } = req.body.data
  const victim = getPlayer(victimId, game.id)
  const thisPlayer = getPlayer(playerId, game.id)
  const otherWerewolf = game.players.find(player => player.role === 'werewolf' && player.id !== playerId)
  
  if (!victim.protected) {
  victim.killedByWolf = true
  }

  thisPlayer.victimId = victimId
  thisPlayer.nightActionCompleted = true
  otherWerewolf.nightActionCompleted = true
 
  areAllNightActionsCompleted(game)
  res.status(200).send({ victim })
}

module.exports = {
  registerPlayer,
  setStatus,
  updateIsPlayerAlive,
  setVote,
  updatePlayerSuspected,
  getGameState,
  startGame,
  startNightStage,
  isPlayerWerewolf,
  healPlayer,
  chooseVictim,
  killVictim
}

