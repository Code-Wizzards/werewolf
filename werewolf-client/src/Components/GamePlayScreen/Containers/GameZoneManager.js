import React from "react";
import GameZonePlayerList from "../Elements/gameZonePlayerList";
// import { GameContext } from "../../../gameManagers/game-manager";
import VotingBooth from "./votingBooth";
import VoteResult from "./voteResult";

// import * as Server from '../../../RestServer';


const GameZone = ({ gameStage, players, playerId, playerRole, nightActionCompleted }) => {
  
   if (gameStage === 'running-day' || gameStage === 'running-night') {
      return (
         <div className="game-zone">
            <h1> the village </h1>
            <GameZonePlayerList players={players} playerId={playerId} playerRole={playerRole} gameStage={gameStage} nightActionCompleted={nightActionCompleted} />
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
