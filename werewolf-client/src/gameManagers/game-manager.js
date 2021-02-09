import React, { createContext } from 'react'
import * as Server from '../RestServer'

export const GameContext = createContext()

export function GameProvider() {
  const [errors, setErrors] = useState([])

  const [gameId, setGameId] = useState()
  const [players, setplayers] = useState([])
  const [gameStage, setGameStage] = useState('')

  const [playerInfo, setPlayerInfo] = useState({ name: '', id: '' })

  const [setUpFunctions] = useState({ addPlayer, joinGame, createNewGame, startGame, getRole,  })
  const [newGameStarted, setNewGameStarted] = useState()

  const [gameFunctions] = useState({ selectPlayer, updateIsPlayerAlive, startNightStage })

  const [playerState, setPlayerState] = useState({
                                                  role: '', 
                                                  isPlayerAlive: false, 
                                                  suspected: '', 
                                                  nightActionCompleted: false })

  const [playerDayActions] = useState({ accusePlayer, secondPlayer, setVote })
  const [playerNightActions] = useState({ chooseVictim, killVictim, healPlayer, isPlayerWerewolf })
  
  const addError = (error) => {
   setErrors(prevErrors => {
     return [...prevErrors, error]
   })
    setTimeout(() => removeError(), 5000)
  }

  const removeError = () => {
    setErrors(prevErrors => {
      prevErrors.shift()
      return prevErrors
    })
  }

  const selectPlayer = (playerId) => {
   return players.find(player => player.id === playerId);
  }

  const addPlayer = async (newPlayerName) => {
    const playerDetails = await Server.registerPlayer(newPlayerName, gameId)
    setPlayerInfo({
      name: playerDetails.name,
      id: playerDetails.id,
    })
    setGameStage('lobby')
    console.log({players}, {gameStage})
  };

  const createNewGame = async () => {
    const gameIdObj = await Server.createNewGame();
    const id = gameIdObj.gameId // grab id from object so can pass down just the number, not an object
    setGameId(id)
    setNewGameStarted(true)
    refresh(gameId)
  };

  const joinGame = async (gameId) => {
    try {
      const gameState = await Server.joinGame(gameId)
      if (gameState.error) {
        addError(gameState.error)
      } else {
        setGameId(gameState.gameId)
        setPlayers(gameState.players)
        refresh(gameState.gameId)
      }
    } catch (err) {
      alert(err)
    }
  }


  const startGame = async () => { // called by lobbyscreen
    const res = await Server.startGame(gameId, playerId)
    if (res.error) {
      alert(res.error)
    }

  }

  const refresh = (gameId) => {
    setInterval(async () => {
      try {
        const gameState = await Server.fetchGameState(gameId)
        this.setState({ players: gameState.players, gameStage: gameState.stage })
        updateThisPlayer()
      }
      catch (error) {
        console.log('Error refreshing gameState:', error)
      }
     
    }, 500)
  }

  const updateThisPlayer = () => {
    const thisPlayer = selectPlayer(playerInfo.id)
    setPlayerState({role: thisPlayer.role, 
                    isPlayerAlive: thisPlayer.isPlayerAlive,
                    nightActionCompleted: thisPlayer.nightActionCompleted})
  }

  const updateIsPlayerAlive = async () => {
    await Server.updateIsPlayerAlive(gameId, playerId)
    // this.setState({ isPlayerAlive: status })
  }

  const accusePlayer= (accuseButtonId) => {
    Server.accusePlayer(gameId, accuseButtonId);
  }

  const secondPlayer = (accuseButtonId) => {
    Server.secondPlayer(gameId, accuseButtonId);
  }

  // getRole = () => {
  //   const thisPlayer = selectThisPlayer()
  //   this.setState({ playerRole: thisPlayer.role });
  //   // this.setState({ playerRole: "healer" });
  // }

  const setVote = (vote) => {
    Server.setVote(gameId, playerId, vote)
  }

  const startNightStage = async () => {
    await Server.startNightStage(gameId)
  }

  const isPlayerWerewolf = async (playerToCheckId) => {
    try {
      const result = await Server.isPlayerWerewolf(gameId, playerId, playerToCheckId)
      return result
    } catch (error) {
      console.log('Error making IsPlayerWerewolf request to server:', error)
    }
    
  }

  const healPlayer = async (playerToHealId) => {
    try {
      await Server.healPlayer(gameId, playerId, playerToHealId)
    } catch(error) {
      console.log('Error making heal player request to server:', error)
      return false
    } 
    return true
  }

  const chooseVictim = async (victimId) => {
    try {
      await Server.chooseVictim(gameId, playerId, victimId)
    } catch(error) {
      console.error(error)
    }
  }

  const killVictim = async (victimId) => {
    try {
      await Server.killVictim(gameId, playerId, victimId)
    } catch(error) {
      console.error(error)
    }
  }

 

 
    return (
      <GameContext.Provider value={this.state}>
        {this.props.children}
      </GameContext.Provider>
    );
  
}



// export const GameConsumer = GameContext.Consumer;
