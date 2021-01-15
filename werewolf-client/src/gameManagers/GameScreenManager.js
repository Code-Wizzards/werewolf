import React, { Component, useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import '../CSS/App.css'
import { GameConsumer, GameContext } from './game-manager'
import StartScreen from '../Components/StartScreen'
import LobbyScreen from '../Components/LobbyScreen'
import EnterNameForm from '../Components/EnterNameForm';
import Title from '../Components/Title';
import RoleCard from '../Components/RoleCard/RoleCard';
import GamePlayScreen from '../Components/GamePlayScreen/GamePlayScreen';
import { withTheme } from '@material-ui/core';

export default function GameScreenManager() {
  
  const { gameStage } =  useContext(GameContext)
  const bgcolor = gameStage === 'running-night' ? '#040139' : '#fafafa'
  const fontColor = gameStage === 'running-night' ? 'white' : 'black'
  const styles = {
    backgroundColor: `${bgcolor}`, 
    color: `${fontColor}`,
    padding: '30px'
  }

    return (
      <div style={styles}>
       <Title />
        <GameConsumer>
         {({ errors }) => {
            if (errors.length) {
              let errorMessages = [];
               for (let i = 0; i < errors.length; i++) {
                 errorMessages.push(<p key={i}>{errors[i].message}</p>)
               }
              return(
                <div id="errors">
                {errorMessages}
                </div>
              )  
            }
        }}
         </GameConsumer> 
         <GameConsumer>
          {(gameState) => {
          const { gameId, username, gameStage, players, userRole } = gameState;
          
          if (!gameId) {
              return (
                <StartScreen />
              )
            }
            if (!username) {
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
                 
                <RoleCard userRole={userRole} />
              )
            }
            const GamePlayScreenStages = ['running-day', 'running-night', 'voting', 'vote result']
            if (GamePlayScreenStages.includes(gameStage)) {
              return (
                <GamePlayScreen userRole={userRole} username={username} gameStage={gameStage} players={players} />
              )
            }
          }}
        </GameConsumer>
      </div>
    )
  
}


// <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
// Werewolf
// </Typography>