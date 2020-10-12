import React, { createContext } from 'react';
import * as Server from '../RestServer'

export const GameContext = createContext({
    userName:'',
    userId:'',
    players: [],
    gameId: '',
    newGameStarted: false,
    // addUser: () => {},
    // startNewGame: () => {},
    // joinGame: () => {},
    // setPlayerStatus: () => {},
    // startGame: () => {}
  }
);

export class GameProvider extends React.Component {
  
  addUser = async (newUserName) => {
    console.log('players is', this.state.players)
    const gameId = this.state.gameId
    const userDetails = await Server.registerUser(newUserName, gameId)
    this.setState({ userName: userDetails.name, 
                    userId: userDetails.id,
                    gameStage: 'lobby'})
    console.log(this.state)
  };

createNewGame = async () => {
    const gameIdObj  = await Server.createNewGame();
    const gameId = gameIdObj.gameId  // grab id from object so can pass down just the number, not an object
    this.setState({ gameId: gameId})
    this.refresh(gameId)
  };

  joinGame = (gameId) => {
   try {
      const gameState = Server.joinGame(gameId)
      this.setState({gameId: gameState.gameId})
      this.setState({players: gameState.players})
      this.refresh(gameState.gameId)
    } catch (err) {
      alert(err)
    }
  }
  
  startNewGame = () => { // TODO: do we need this?
    this.createNewGame()
    this.setState({newGameStarted: true })
  };

  startGame = async () => {
   const userRole = await Server.startGame(this.state.gameId, this.state.userId)
   this.setState({userRole: userRole})
  }

  refresh = (gameId) => {
    setInterval(async () => {
      try {
        const gameState = await Server.fetchGameState(gameId)
        this.setState({players: gameState.players, gameStage: gameState.stage})
      }
      catch(error) {
        console.log('Error refreshing gameState:', error)
      }
    }, 1000)
  }

  updateIsPlayerAlive = async () => {
    const status = await Server.updateIsPlayerAlive(this.state.gameId, this.state.userId)
    this.setState({isPlayerAlive: status})
    // setTimeout( () => { console.log(this.state.isPlayerAlive) }, 5000);
  }

  playerAccused = (accuseButtonId) => {
    Server.playerAccused(this.state.gameId, accuseButtonId);
  }

  state = {
    players: [],
    gameId: '',
    userName:'',
    userId: '',
    userRole: 'no role',
    isPlayerAlive: null,
    accused: null,
    gameStage: '',
    newGameStarted: false,
    createNewGame: this.createNewGame,
    addUser: this.addUser,
    startNewGame: this.startNewGame,
    joinGame: this.joinGame,
    refresh: this.refresh,
    startGame: this.startGame,
    updateIsPlayerAlive: this.updateIsPlayerAlive,
    playerAccused: this.playerAccused
  }; 
  
  render() {
    return (
      <GameContext.Provider value={this.state}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}

export const GameConsumer = GameContext.Consumer;
