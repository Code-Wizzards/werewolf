import React, { useContext } from "react";
import "./gameplay-screen-styles.css";
import Header from "../DaytimeScreen/Containers/Header.js";
import GameZone from "../DaytimeScreen/Containers/GameZoneManager";
import GameLog from "../DaytimeScreen/Containers/GameLog";


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

