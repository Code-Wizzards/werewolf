import React, {useContext, useState} from 'react';
import { Container, Box, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';


import { GameContext } from '../gameManagers/game-manager'

const EnterNameForm = () => {
  const {addPlayer} = useContext(GameContext)
  const [input, setInput] = useState('');
  const [enterNameError, setEnterNameError] = useState(false)

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleClick = () => {
   if (input === '') {
      return setEnterNameError(true)
    } 
   addPlayer(input)
   setEnterNameError(false)
  }

  return (
    <Container>
      <Box p={3}>
        <TextField  error={enterNameError}
        helperText={enterNameError ? 'Please enter a name' : ' '} id="name-input" label="Enter Your Name" variant="outlined" onChange={ handleChange } />
      </Box> 
      <Box p={1} display="flex" justifyContent="center" alignItems="center">
        <Button color="primary" variant="contained" align="center" onClick={ handleClick }>
          Start
        </Button>
      </Box>
    </Container>
  );
}

export default EnterNameForm