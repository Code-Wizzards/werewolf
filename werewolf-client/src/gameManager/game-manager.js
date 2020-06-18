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
  addUser = (newUserName) => {
    const userDetails = Server.registerUser(newUserName)
    this.setState({ userName: userDetails.name });
    this.setState({ players: [...this.state.players, userDetails ]});
    console.log(this.state)
    Server.simulateUsersJoining()
  };

 createNewGame = async (userName) => {
  
    const gameId  = await Server.createNewGame();
    console.log('received new gameId', gameId)
    this.setState({ gameID: gameId})
    const userDetails = Server.registerUser(userName, gameId)
    this.setState({ userName: userName });
    // this.setState({ players: [...this.state.players, userDetails ]});
    console.log(userDetails)
    this.setState({ newGameStarted: false })
    // Server.simulateUsersJoining()
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
    // const newGameID = Server.startGame()
    // this.setState({ gameID: newGameID });
    this.setState({newGameStarted: true })
    setTimeout(() => {
    console.log(this.state.newGameStarted)
    }, 2000)
  };

  componentDidMount = () => {
    setInterval(async () => {
      console.log('refresh')
      const gameStatePromise = Server.fetchGameState()
      gameStatePromise.then((gameState) => this.setState({players: gameState.players}))
    }, 1000)

  }
  
  state = {
    players: [],
    gameID: '',
    userName:'',
    newGameStarted: false,
    createNewGame: this.createNewGame,
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
