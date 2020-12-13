import React, { useContext } from "react";
import GameZonePlayerList from "../Elements/gameZonePlayerList";
import { GameContext } from "../../../gameManagers/game-manager";
import VotingBooth from "./votingBooth";
import VoteResult from "../Elements/voteResult";

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
