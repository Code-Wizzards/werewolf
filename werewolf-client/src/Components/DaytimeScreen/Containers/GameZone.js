import React, { useContext } from "react";
import GameZonePlayerList from "../Elements/gameZonePlayerList";
import { GameContext } from "../../../gameManagers/game-manager";
import VotingBooth from "../Elements/votingBooth";

// import * as Server from '../../../RestServer';


const GameZone = () => {
   const { gameStage } = useContext(GameContext)
   if (gameStage === 'running') {
      return (
         <div className="game-zone">
            <h1> the village </h1>
            <GameZonePlayerList />
         </div>
      );
   }
   if (gameStage === "voting") {
      return(
      <div className="game-zone">
         <h1> time to vote </h1>
         <VotingBooth />
      </div>
      )
   }
  
};

export default GameZone;
