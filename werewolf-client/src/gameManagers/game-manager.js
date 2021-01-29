import React, { createContext } from 'react';
import * as Server from '../RestServer'

export const GameContext = createContext({
    playerName:'',
    playerId:'',
    players: [],
    gameId: '',
    newGameStarted: false,
    // addPlayer: () => {},
    // startNewGame: () => {},
    // joinGame: () => {},
    // setPlayerStatus: () => {},
    // startGame: () => {}
  }
);

export class GameProvider extends React.Component {
  
   addError = (error) => {
     this.setState({ errors: [...this.state.errors, error]})
     setTimeout(() => this.state.removeError(), 5000)  
   }

  removeError = () => {
     this.setState({ errors: this.state.errors.slice(1)})
  }

  addPlayer = async (newPlayerName) => {
    const gameId = this.state.gameId
    const playerDetails = await Server.registerPlayer(newPlayerName, gameId)
    this.setState({ playerName: playerDetails.name, 
                    playerId: playerDetails.id,
                    gameStage: 'lobby'})
    console.log(this.state)
  };

   createNewGame = async () => {
      const gameIdObj  = await Server.createNewGame();
      const gameId = gameIdObj.gameId  // grab id from object so can pass down just the number, not an object
      this.setState({ gameId: gameId})
      this.refresh(gameId)
  };

   joinGame = async (gameId) => {
      try {
         const gameState = await Server.joinGame(gameId)
         if (gameState.error) {
            this.state.addError(gameState.error)
         } else {
            this.setState({gameId: gameState.gameId})
            this.setState({players: gameState.players})
            this.refresh(gameState.gameId)
         }
      } catch (err) {
         alert(err)
      }
  }
  
  startNewGame = () => { 
    this.createNewGame()
    this.setState({newGameStarted: true })
  };

  startGame = async () => {
    const res = await Server.startGame(this.state.gameId, this.state.playerId)
      if (res.error) {
          alert(res.error)
       }
    
  }

  refresh = (gameId) => {
    setInterval(async () => {
      try {
        const gameState = await Server.fetchGameState(gameId)
        this.setState({players: gameState.players, gameStage: gameState.stage})
        if (this.state.gameStage === "role assignment") {
           this.getRole()
        }
      }
      catch(error) {
        console.log('Error refreshing gameState:', error)
      }
    }, 1000)
  }

  updateIsPlayerAlive = async () => {
    const status = await Server.updateIsPlayerAlive(this.state.gameId, this.state.playerId)
    this.setState({isPlayerAlive: status})
    // setTimeout( () => { console.log(this.state.isPlayerAlive) }, 5000);
  }

  playerAccused = (accuseButtonId) => {
    Server.playerAccused(this.state.gameId, accuseButtonId);
  }

  playerSeconded = (accuseButtonId) => {
     Server.playerSeconded(this.state.gameId, accuseButtonId);
  }

  getRole = () => {
     const thisPlayer = this.state.players.find(player => player.id === this.state.playerId);
     this.setState({playerRole: thisPlayer.role});
  }

  setVote = (vote) => {
    Server.setVote(this.state.gameId, this.state.playerId, vote)
  }

  sunset = async () => {
    await Server.sunset(this.state.gameId)
  }

  isPlayerWerewolf = async (playerId) => {
    const answer = await Server.isPlayerWerewolf(this.state.gameId, playerId)
    console.log('isPlayerWerewolf GM', {answer})
    return answer.body.message
  }

  healPlayer = async (playerId) => {
    const response = await Server.healPlayer(this.state.gameId, playerId)
    return response.body.answer
  }

  state = {
    errors: [],
    players: [],
    gameId: '',
    playerName:'',
    playerId: '',
    playerRole: '',
    isPlayerAlive: null,
    accused: null,
    gameStage: '',
    newGameStarted: false,
    createNewGame: this.createNewGame,
    addPlayer: this.addPlayer,
    startNewGame: this.startNewGame,
    joinGame: this.joinGame,
    refresh: this.refresh,
    startGame: this.startGame,
    updateIsPlayerAlive: this.updateIsPlayerAlive,
    playerAccused: this.playerAccused,
    playerSeconded: this.playerSeconded,
    getRole: this.getRole,
    setVote: this.setVote,
    addError: this.addError,
    removeError: this.removeError,
    sunset: this.sunset,
    isPlayerWerewolf: this.isPlayerWerewolf,
    healPlayer: this.healPlayer
  }
  
  render() {
    return (
      <GameContext.Provider value={this.state}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}

export const GameConsumer = GameContext.Consumer;
