import React, { useContext } from "react";
import PlayerListItem from "./playerListItem";
import { GameContext } from '../../../gameManagers/game-manager';



const GameZonePlayerList = () => {
  const { players } = useContext(GameContext);
  // const playerNames = players.map(player => player.name);
  const playerListDisplay = players.map(player => 
    <PlayerListItem playerName={player.name} key={player.id} id={player.id}/>
  );
    return (

      <div className="player-list">
         {playerListDisplay}
      </div>
    )

}



export default GameZonePlayerList;