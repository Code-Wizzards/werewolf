import React, { useContext } from "react";
import { GameContext } from '../../../gameManager/game-manager'
// import * as Server from '../../../RestServer';
import PlayerListItem from "../Elements/playerListItem";

const GameZone = () => {
  const { players } = useContext(GameContext)
  const playerList = players.map(player => player.name)
  const playerListDisplay = playerList.map(playerName => 
    <PlayerListItem player={playerName} />
  );

  return (
    <div className="game-zone">
      <h1> the village </h1>
      <div className="player-list">{playerListDisplay}</div>
    </div>
  );
};

export default GameZone;
