import React, { useContext } from 'react';
import UserAvatar from '../Elements/userAvatar';
import { GameContext } from "../../../gameManagers/game-manager";


const VoteResult = () => {
   const { players } = useContext(GameContext);
   const theAccused = players.find(player => player.status)
   return( 
      <div className="vote-result">
         <UserAvatar username={theAccused.name} avatar={"https://via.placeholder.com/150x120"}/>
         <p> has been... </p>
         <h1> {theAccused.status} </h1> 
         <button>continue</button>
      </div>
   )

}

export default VoteResult;