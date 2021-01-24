import React, { useState, useContext } from 'react'
import HealerNightButton from './healerNightButton';
import SeerNightButton from './seerNightButton';
import VillagerNightButton from './villagerNightButton';
import WerewolfNightButton from './werewolfNightButton';


const NightButton = ({userRole, id}) => {
  
  if (userRole === 'villager') {
    return(
      <VillagerNightButton id={id} />
    )
  }

  if (userRole === 'healer') {
    return (
      <HealerNightButton id={id} />
    )
  }

  if (userRole === 'seer') {
    return (
      <SeerNightButton id={id} />
    )
  }

  if (userRole === 'werewolf') {
    return (
      <WerewolfNightButton id={id} />
    )
  }


 
}


export default NightButton;