import React, { useState, useContext } from 'react'
import HealerNightButton from './healerNightButton';
import SeerNightButton from './seerNightButton';
import VillagerNightButton from './villagerNightButton';
import WerewolfNightButton from './werewolfNightButton';
import { GameContext } from "../../../../gameManagers/game-manager";


const NightButton = ({playerRole, playerId, id, nightActionCompleted, werewolves}) => {

// const {nightActionCompleted} = useContext(GameContext)
// console.log({nightActionCompleted})
  
  if (playerRole === 'villager') {
    return(
      <VillagerNightButton id={id} />
    )
  }

  if (playerRole === 'healer') {
    return (
      <HealerNightButton id={id} nightActionCompleted={nightActionCompleted}/>
    )
  }

  if (playerRole === 'seer') {
    return (
      <SeerNightButton id={id} nightActionCompleted={nightActionCompleted}/>
    )
  }

  if (playerRole === 'werewolf') {
    return (
      <WerewolfNightButton id={id} playerId={playerId} werewolves={werewolves} nightActionCompleted={nightActionCompleted}/>
    )
  }

  return (
    <button>No role</button>
  )


 
}


export default NightButton;