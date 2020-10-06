import React, {useContext} from 'react';
import { GameContext } from '../gameManagers/game-manager'
import { Button } from '@material-ui/core';

const  StartButton  = () => {
  const {startNewGame} = useContext(GameContext)
  return (
    <Button color="primary" variant="contained" align="center"  onClick={startNewGame}>
      Start New Game
    </Button>
  )
  
}

export default StartButton