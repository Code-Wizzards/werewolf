import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';

import { GameConsumer } from './gameManager/game-manager'
import StartScreen from './Components/StartScreen'
import LobbyScreen from './Components/LobbyScreen'
import EnterNameForm from './Components/EnterNameForm';


export default class GameScreenManager extends Component {
  render() {
    return (
      <div>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Werewolf
        </Typography>
        <GameConsumer>
          {(gameState) => {
            if (!gameState.gameId) {
              return (
                <StartScreen />
              )
            }
            if (!gameState.userName) {
              return (
                <EnterNameForm />
              )
            }
            return (
              <LobbyScreen players={gameState.players} />
            )
          }}
        </GameConsumer>
      </div>
    )
  }
}
