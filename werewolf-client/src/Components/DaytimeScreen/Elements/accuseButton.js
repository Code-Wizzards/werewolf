import React, { useContext } from 'react';
import { GameContext } from '../../../gameManagers/game-manager';


const AccuseButton = (props) => {
   const thisPlayerId = props.id;
   const { players, playerAccused, playerSeconded } = useContext(GameContext);
   const accusedPlayersIds = players.filter(player => player.accused).map(player => player.id)
   const isThisPlayerAccused = accusedPlayersIds.includes(thisPlayerId)
   let color;
   let buttonText;

   function handleClick() {
      isThisPlayerAccused ? playerSeconded(thisPlayerId) : playerAccused(thisPlayerId);
   }

   if (isThisPlayerAccused){
      buttonText = 'second'
      color = '#16A9DF';
    } else {
      buttonText = 'accuse'
      color = '#df1623';
    }
   
 
    return (
      <button id={thisPlayerId} style={{ backgroundColor: color }} onClick={handleClick}> { buttonText } </button>
    )
}


export default AccuseButton;