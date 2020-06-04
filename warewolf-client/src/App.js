import React from 'react';

import GameScreenManager from './GameScreenManager'
import './App.css';
import { GameProvider } from './gameManager/game-manager'

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <GameProvider>
          <GameScreenManager/>
        </GameProvider>
        </Container>
    </>
  );
}

export default App;
