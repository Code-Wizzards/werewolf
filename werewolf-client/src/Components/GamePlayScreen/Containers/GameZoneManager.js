import React, { useContext } from "react";
import GameZonePlayerList from "../Elements/gameZonePlayerList";
import { GameContext } from "../../../gameManagers/game-manager";
import VotingBooth from "./votingBooth";
import VoteResult from "./voteResult";

// import * as Server from '../../../RestServer';


const GameZone = ({ gameStage, players, userRole }) => {
  
   if (gameStage === 'running-day' || gameStage === 'running-night') {
      return (
         <div className="game-zone">
            <h1> the village </h1>
            <GameZonePlayerList players={players} userRole={userRole} gameStage={gameStage} />
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

   if(gameStage === "vote result") {
      return(
         <div className="game-zone">
          <h1> votes are in </h1>
          <VoteResult />
         </div>
      )
   }
  
};

export default GameZone;
