import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { Container, Box } from '@material-ui/core';

import { GameConsumer } from './gameManager/game-manager'
import StartButton from './StartButton'
import JoinGameForm from './JoinGameForm'
import PlayerList from './PlayerList';
import EnterNameForm from './EnterNameForm'

export default class GameScreenManager extends Component {

  render() {
    return (
      <>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Werewolf
        </Typography>
        <GameConsumer>
        {(gameState) => {
                if(!gameState.gameID) {
                  return (
                    <>
                      <Container >
                        <JoinGameForm/>
                      </Container>
                      <Container align="center" >
                        <Box m={5}>
                          <StartButton/>
                        </Box>
                      </Container>
                    </>
                  )
                } else {
                  if(!gameState.userName) {
                    return <EnterNameForm/>
                  }
                  return (
                    <PlayerList players={gameState.players}/>
                  )
                }
              }
            }
        </GameConsumer>
    </>
    )
  }
}