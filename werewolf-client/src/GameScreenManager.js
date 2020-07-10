import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { Container, Box } from '@material-ui/core';

import { GameConsumer } from './gameManager/game-manager'
import StartButton from './Components/StartButton'
import JoinGameForm from './Components/JoinGameForm'
import PlayerList from './Components/PlayerList';
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
                <div>
                  <Container >
                    <JoinGameForm />
                  </Container>
                  <Container align="center" >
                    <Box m={5}>
                      <StartButton />
                    </Box>
                  </Container>
                </div>
              )
            }

            if (!gameState.userName) {
              return (
                <EnterNameForm />
              )
            }

            return (
              <PlayerList players={gameState.players} />
            )
          }}
        </GameConsumer>
      </div>
    )
  }
}
