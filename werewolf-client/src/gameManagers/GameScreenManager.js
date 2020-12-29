import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';

import { GameConsumer } from './game-manager'
import StartScreen from '../Components/StartScreen'
import LobbyScreen from '../Components/LobbyScreen'
import EnterNameForm from '../Components/EnterNameForm';
import Title from '../Components/Title';
import RoleCard from '../Components/RoleCard/RoleCard';
import DaytimeScreen from '../Components/DaytimeScreen/DaytimeScreen';

export default class GameScreenManager extends Component {
  render() {
    return (
      <div>
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
            if (gameStage === 'running' || gameStage === 'voting' || gameStage === 'vote result') {
              return (
                <DaytimeScreen userRole={userRole} username={username} />
              )
            }
          }}
        </GameConsumer>
      </div>
    )
  }
}


// <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
// Werewolf
// </Typography>