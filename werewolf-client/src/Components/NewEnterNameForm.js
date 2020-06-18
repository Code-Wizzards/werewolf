import React, {useContext, useState} from 'react';

import { Container, Box, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { spacing } from '@material-ui/system';

import { GameContext } from '../gameManager/game-manager'
import { createNewGame } from '../RestServer';

const EnterNameForm = () => {
  const {createNewGame} = useContext(GameContext)
  const [input, setInput] = useState(0);

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleClick = () => {
    console.log('add first user click', input);
    createNewGame(input)
  }

  return (
    <Container>
      <Box p={3}>
        <TextField id="name-input" label="Enter Your Name" variant="outlined" onChange={ handleChange } />
      </Box>
      <Box p={1} display="flex" justifyContent="center" alignItems="center">
        <Button color="primary" variant="contained" align="center" onClick={ handleClick }>
         Create New Game
        </Button>
      </Box>
    </Container>
  );
}

export default EnterNameForm