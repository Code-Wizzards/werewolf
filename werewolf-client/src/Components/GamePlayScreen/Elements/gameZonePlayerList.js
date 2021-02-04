import React from "react";
import PlayerListItem from "./playerListItem";
// import { GameContext } from '../../../gameManagers/game-manager';
import AccuseButton from "./accuseButton";
import NightButton from './nightButtons/nightButton'


const GameZonePlayerList = ({ players, playerRole, playerId, gameStage, nightActionCompleted }) => {

  const werewolves = players.filter(player => player.role === 'werewolf')

  const playerListDisplay = players.map(player => 
   <div className='player-list-item' key={player.id+100}>
      <PlayerListItem playerName={player.name} key={player.id+200} id={player.id}/>
      {gameStage === 'running-night' ? 
      <NightButton id={player.id} 
                  key={player.id} 
                  playerRole={playerRole} 
                  playerId={playerId}
                  nightActionCompleted={nightActionCompleted}
                  werewolves={werewolves} /> :
      <AccuseButton id={player.id} key={player.id} /> }  
   </div>
  );
    return (
      <div className="player-list">
         {playerListDisplay}
      </div>
    )

}



export default GameZonePlayerList;