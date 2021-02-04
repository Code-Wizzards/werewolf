import React from "react";
import "./gameplay-screen-styles.css";
import Header from "./Containers/Header.js";
import GameZone from "./Containers/GameZoneManager";
import GameLog from "./Containers/GameLog";


export default function GamePlayScreen({ playerRole, playerName, playerId, gameStage, players, nightActionCompleted }) {

  return (
    <div className={`game-play-screen ${gameStage === 'running-night' ? 'night-screen' : ''}`}>
      <Header
        playerRole={playerRole}
        playerName={playerName}
        avatar="https://via.placeholder.com/150x120"
      />
      <GameZone gameStage={gameStage} players={players} playerId={playerId} playerRole={playerRole} nightActionCompleted={nightActionCompleted} />
      <GameLog />
    </div>
  );
}

