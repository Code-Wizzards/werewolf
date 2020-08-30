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
    console.log('joining game:')
    try {
      const gameState = Server.joinGame(gameId)
      this.setState({gameId: gameState.gameId})
      this.setState({players: gameState.players})
      this.refresh(gameState.gameId)
    } catch (err) {
      alert(err)
    }
  }
  
  startNewGame = () => {
    this.createNewGame()
    this.setState({newGameStarted: true })
  };

  startGame = async () => {
   const userRole = await Server.startGame(this.state.gameId, this.state.userId)
   this.setState({userRole: userRole, gameStage: "role assignment"})
  }

  refresh = (gameId) => {
    setInterval(async () => {
      try {
        const gameState = await Server.fetchGameState(gameId)
        this.setState({players: gameState.players})
      }
      catch(error) {
        console.log('Error refreshing gameState:', error)
      }
    }, 1000)
  }


  state = {
    players: [],
    gameId: '',
    userName:'',
    userId: '',
    userRole: '',
    gameStage: '',
    newGameStarted: false,
    createNewGame: this.createNewGame,
    addUser: this.addUser,
    startNewGame: this.startNewGame,
    joinGame: this.joinGame,
    refresh: this.refresh,
    startGame: this.startGame
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
