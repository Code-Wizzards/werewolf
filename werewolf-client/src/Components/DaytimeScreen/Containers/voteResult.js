import React, { useContext } from 'react';
import UserAvatar from '../Elements/userAvatar';
import { GameContext } from "../../../gameManagers/game-manager";
import { Button } from '@material-ui/core';


const VoteResult = () => {
  const { players, sunset } = useContext(GameContext);
  const theAccused = players.find(player => player.suspected)
  
  

  return( 
    <div className="vote-result">
        <UserAvatar username={theAccused.name} avatar={"https://via.placeholder.com/150x120"}/>
        <p> has been... </p>
        <h1> {theAccused.suspected} </h1> 
        <Button onClick={sunset} color="secondary" variant="contained" align="center" size="medium">continue</Button>
    </div>
  )

}

export default VoteResult;