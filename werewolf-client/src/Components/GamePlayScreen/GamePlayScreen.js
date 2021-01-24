import React, { useContext } from "react";
import "./gameplay-screen-styles.css";
import Header from "./Containers/Header.js";
import GameZone from "./Containers/GameZoneManager";
import GameLog from "./Containers/GameLog";


export default function GamePlayScreen({ userRole, username, gameStage, players }) {

  return (
    <div className={`game-play-screen ${gameStage === 'running-night' ? 'night-screen' : ''}`}>
      <Header
        userRole={userRole}
        username={username}
        avatar="https://via.placeholder.com/150x120"
      />
      <GameZone gameStage={gameStage} players={players} userRole={userRole} />
      <GameLog />
    </div>
  );
}

