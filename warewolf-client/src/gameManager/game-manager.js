import React, { createContext } from 'react';
import * as Server from '../RestServer'

export const GameContext = createContext({
    userName:'',
    players: [],
    gameID: '',
    addUser: () => {},
    startNewGame: () => {},
    joinGame: () => {}
  }
);

export class GameProvider extends React.Component {
  addUser = (newUserName) => {
    const userDetails = Server.registerUser(newUserName)
    this.setState({ userName: userDetails.name });
    this.setState({ players: [...this.state.players, userDetails ]});
    Server.simulateUsersJoining()
  };

  joinGame = (gameId) => {
    console.log('joining game:')
    try {
      const gameState = Server.joinGame(gameId)
      this.setState({gameID: gameState.gameId})
      this.setState({players: gameState.players})
    } catch (err) {
      alert(err)
    }
  }
  
  startNewGame = () => {
    console.log('startNewGame')
    const newGameID = Server.startGame()
    this.setState({ gameID: newGameID });
  };

  componentDidMount = () => {
    setInterval(() => {
      console.log('refresh')
      this.setState({players: Server.fetchGameState().players})
    }, 1000)

  }
  
  state = {
    players: [],
    gameID: '',
    userName:'',
    addUser: this.addUser,
    startNewGame: this.startNewGame,
    joinGame: this.joinGame
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
