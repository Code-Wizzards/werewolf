import React, { useState, useContext } from 'react'
import { GameContext } from '../../../../gameManagers/game-manager';


const WerewolfNightButton = ({id, playerId, werewolves, nightActionCompleted}) => {
  
  const { chooseVictim, killVictim } = useContext(GameContext)
  
  const thisWerewolfVictim = werewolves.find(wolf => wolf.id === playerId).victimId
  const otherWerewolfVictim = werewolves.find(wolf => wolf.id !== playerId).victimId
   
  let border = 'none'
  let text = 'kill'

  if (thisWerewolfVictim === id && otherWerewolfVictim === id) {
     border = ''
     text = 'killed'
   } else if (thisWerewolfVictim === id) {
     border = '2px solid white'
   } else if (otherWerewolfVictim === id) {
     border = '2px solid blue'
   }
 
  const style = {
    backgroundColor: nightActionCompleted ? '#d14951' : '#df1623',
    color: nightActionCompleted ? '#e3acac' : 'white',
    border
   }
 
  async function handleClick() {
    id === otherWerewolfVictim ? await killVictim(id) : await chooseVictim(id) 
      
  }

  return (
    <button disabled={nightActionCompleted}
            id={id} 
            style={style} 
            onClick={handleClick}> 
            {text} 
    </button>
  )
}


export default WerewolfNightButton;