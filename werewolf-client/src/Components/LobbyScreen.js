import React, {useContext, useState} from 'react';
import { GameContext } from '../gameManager/game-manager'
import PlayerList from './PlayerList'
import { Container, Box, Button, TextField } from '@material-ui/core';
import { setPlayerStatus } from '../RestServer'

const LobbyScreen = ({ players }) => {
  const [ statusInput, setStatusInput ] = useState('')
  const { userId, gameId } = useContext(GameContext)

  const handleChange = (e) => {
    setStatusInput(e.target.value)
  }

  const handleClick = () => {
    setPlayerStatus(userId, gameId, statusInput)
    setStatusInput('')
  }

  return (
    <Container>

      <PlayerList players={players} />
      <Button color="primary" variant="contained" align="center" >
        Start The Game
      </Button>

      <Box>
        <Box p={3}>
          <TextField value={statusInput} id="status-input" label="Set a Status" variant="outlined" onChange={handleChange}/>
          <Button color="secondary" variant="contained" align="center" onClick={handleClick}>
            Set
        </Button>
        </Box>
      </Box>

    </Container>
  )
}

export default LobbyScreen