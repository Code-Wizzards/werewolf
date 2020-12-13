import React, {useContext, useState} from 'react';
import { GameContext } from '../gameManagers/game-manager'
import { Container, Box, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { spacing, flexbox } from '@material-ui/system';

const JoinGameForm = ()=> {
  const { joinGame } = useContext(GameContext)
  const [ input, setInput ] = useState('')
  const [inputError, setInputError] = useState(false)

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
   if (input === '') {
      return setInputError(true)
   }
   joinGame(input)
   setInputError(false)
  }

    return (
      <Container>
        <Box pt={3} pb={1} justifyContent="center" display="flex">
          <TextField 
            error={inputError} 
            helperText={inputError ? 'Please enter a game ID' : ''}
            id="outlined-basic" 
            label="Game ID" 
            variant="outlined" 
            onChange={handleChange} />
          </Box>
          <Box justifyContent="center" display="flex">
          <Button 
            color="secondary" 
            variant="contained" 
            align="center" 
            onClick={handleClick}>
            Join
          </Button>
        </Box>
      </Container>
    );
}

export default JoinGameForm