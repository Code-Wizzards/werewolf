import React, { useContext } from "react";
import PlayerListItem from "./playerListItem";
import { GameContext } from '../../../gameManagers/game-manager';
import AccuseButton from "./accuseButton";
import NightButton from './nightButton'


const GameZonePlayerList = ({ players, userRole, gameStage }) => {

  const playerListDisplay = players.map(player => 
   <div className='player-list-item' key={player.id+100}>
      <PlayerListItem playerName={player.name} key={player.id+1} id={player.id}/>
      {gameStage === 'running-night' ? 
      <NightButton id={player.id} key={player.id} userRole={userRole} /> :
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