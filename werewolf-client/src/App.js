import React from 'react';
import GameScreenContainer from './gameManagers/GameScreenContainer'
import { GameProvider } from './gameManagers/game-manager'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
 

  return (
  
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <GameProvider>
          <GameScreenContainer />
        </GameProvider>
        </Container>
    </>
  
  );
}

export default App;
