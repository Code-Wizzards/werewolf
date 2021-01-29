import React, { useState, useContext } from 'react'
import HealerNightButton from './healerNightButton';
import SeerNightButton from './seerNightButton';
import VillagerNightButton from './villagerNightButton';
import WerewolfNightButton from './werewolfNightButton';


const NightButton = ({playerRole, id}) => {
  
  if (playerRole === 'villager') {
    return(
      <VillagerNightButton id={id} />
    )
  }

  if (playerRole === 'healer') {
    return (
      <HealerNightButton id={id} />
    )
  }

  if (playerRole === 'seer') {
    return (
      <SeerNightButton id={id} />
    )
  }

  if (playerRole === 'werewolf') {
    return (
      <WerewolfNightButton id={id} />
    )
  }


 
}


export default NightButton;