import React, { useContext } from "react";
import GameZonePlayerList from "../Elements/gameZonePlayerList"

// import * as Server from '../../../RestServer';


const GameZone = () => {

  return (
    <div className="game-zone">
      <h1> the village </h1>
      <GameZonePlayerList />
    </div>
  );
};

export default GameZone;
