import React, { createContext } from 'react';
import * as Server from '../RestServer'

export const GameContext = createContext({
    userName:'',
    players: [],
    gameID: '',
    newGameStarted: false,
    addUser: () => {},
    startNewGame: () => {},
    joinGame: () => {}
  }
);

export class GameProvider extends React.Component {
  addUser = async (newUserName) => {
    const gameId = this.state.gameId
    const userDetails = await Server.registerUser(newUserName, gameId)
    this.setState({ userName: userDetails.name });
    this.setState({ players: [...this.state.players, userDetails ]});
    console.log(this.state)
    Server.simulateUsersJoining()
  };

 createNewGame = async () => {
    const gameIdObj  = await Server.createNewGame();
    const gameId = gameIdObj.gameId  // grab id from object so can pass down just the number, not an object
    console.log('GM createnewgame', 'obj:', gameIdObj, 'ID:', gameId)
    this.setState({ gameId: gameId})
    this.refresh(gameId)
  };

  joinGame = (gameId) => {
    console.log('joining game:')
    try {
      const gameState = Server.joinGame(gameId)
      this.setState({gameId: gameState.gameId})
      this.setState({players: gameState.players})
      console.log(this.state.userName)
      this.refresh(gameState.gameId)
    } catch (err) {
      alert(err)
    }
  }
  
  startNewGame = () => {
    this.createNewGame()
    this.setState({newGameStarted: true })
  };

  refresh = (gameId) => {
    setInterval(async () => {
      console.log('refresh')
      let gameStatePromise;
      try {
        gameStatePromise = Server.fetchGameState(gameId)
        gameStatePromise.then((gameState) => this.setState({players: gameState.players}))
      }
      catch(error) {
        console.log(error.message)
      }
    }, 1000)
  }
  
  state = {
    players: [],
    gameId: '',
    userName:'',
    newGameStarted: false,
    createNewGame: this.createNewGame,
    addUser: this.addUser,
    startNewGame: this.startNewGame,
    joinGame: this.joinGame,
    refresh: this.refresh
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
