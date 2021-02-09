import React, {useContext} from 'react';
import { GameContext } from './game-manager'
import AppHeader from '../Components/AppHeader';
import GameScreenManager from './GameScreenManager'
import '../CSS/GameScreenContainer.css'

export default function GameScreenContainer() {
  const { gameStage } = useContext(GameContext)

  const theme = gameStage === 'running-night' ? 'night-screen' : 'day-screen'

  return(
    <div className={theme}>
      <AppHeader />
      <GameScreenManager/>
    </div>
  )

}