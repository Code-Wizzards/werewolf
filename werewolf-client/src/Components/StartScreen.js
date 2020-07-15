import React from 'react'
import { Container, Box } from '@material-ui/core';

import StartButton from './StartButton'
import JoinGameForm from './JoinGameForm'

export default function StartScreen() {

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