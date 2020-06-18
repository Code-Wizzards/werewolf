import React, {useContext} from 'react';
import { GameContext } from '../gameManager/game-manager'
import { Container, Box, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { spacing, flexbox } from '@material-ui/system';

const JoinGameForm = ()=> {
  const { joinGame } = useContext(GameContext)

    return (
      <Container>
        <Box pt={3} pb={1} justifyContent="center" display="flex">
          <TextField id="outlined-basic" label="Game ID" variant="outlined" />
          </Box>
          <Box justifyContent="center" display="flex">
          <Button color="secondary" variant="contained" align="center" onClick={() => joinGame('123')}>
            Join
          </Button>
        </Box>
      </Container>
    );
}

export default JoinGameForm