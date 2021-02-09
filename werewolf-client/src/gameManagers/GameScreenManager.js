import React, { useContext } from 'react'
// import Typography from '@material-ui/core/Typography';
import { GameContext } from './game-manager'
import StartScreen from '../Components/StartScreen'
import LobbyScreen from '../Components/LobbyScreen'
import EnterNameForm from '../Components/EnterNameForm';
import RoleCard from '../Components/RoleCard/RoleCard';
import GamePlayScreen from '../Components/GamePlayScreen/GamePlayScreen';
// import { withTheme } from '@material-ui/core';


export default function GameScreenManager() {
  const { gameId, playerName, playerId, gameStage, players, playerRole, nightActionCompleted } =  useContext(GameContext)

  if (!gameId) {
      return (
        <StartScreen />
      )
    }
    if (!playerName) {
      return (
        <EnterNameForm />
      )
    }
    if (gameStage === 'lobby') {
    return (
      <LobbyScreen players={players} />
      )
    }
    if (gameStage === 'role assignment') {
      return (
          
        <RoleCard playerRole={playerRole} />
      )
    }
    const GamePlayScreenStages = ['running-day', 'running-night', 'voting', 'vote result']
    if (GamePlayScreenStages.includes(gameStage)) {
      return (
        <GamePlayScreen playerRole={playerRole} 
                        playerName={playerName} 
                        playerId={playerId} 
                        gameStage={gameStage} 
                        players={players} 
                        nightActionCompleted={nightActionCompleted} />
      )
    }
}


