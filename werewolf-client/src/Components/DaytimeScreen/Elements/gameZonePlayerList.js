import React, { useContext } from "react";
import PlayerListItem from "./playerListItem";
import { GameContext } from '../../../gameManagers/game-manager';
import AccuseButton from "./accuseButton";


const GameZonePlayerList = () => {
  const { players } = useContext(GameContext);
  
  const playerListDisplay = players.map(player => 
   <div className='player-list-item'>
      <PlayerListItem playerName={player.name} key={player.id} id={player.id}/>
      <AccuseButton id={player.id} />
   </div>
  );
    return (
      <div className="player-list">
         {playerListDisplay}
      </div>
    )

}



export default GameZonePlayerList;