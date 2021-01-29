import React, { useContext } from "react";
import PlayerListItem from "./playerListItem";
import { GameContext } from '../../../gameManagers/game-manager';
import AccuseButton from "./accuseButton";
import NightButton from './nightButtons/nightButton'


const GameZonePlayerList = ({ players, playerRole, gameStage }) => {

  const playerListDisplay = players.map(player => 
   <div className='player-list-item' key={player.id+100}>
      <PlayerListItem playerName={player.name} key={player.id+200} id={player.id}/>
      {gameStage === 'running-night' ? 
      <NightButton id={player.id} key={player.id} playerRole={playerRole} /> :
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