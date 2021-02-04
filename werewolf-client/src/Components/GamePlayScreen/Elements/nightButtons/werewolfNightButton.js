import React, { useState, useContext } from 'react'
import { GameContext } from '../../../../gameManagers/game-manager';


const WerewolfNightButton = ({id, playerId, werewolves}) => {
  
   const { chooseVictim } = useContext(GameContext)
   const [ buttonText, setButtonText ] = useState('kill')
   
   const thisWerewolf = werewolves.find(wolf => wolf.id === playerId)
   const otherWerewolf = werewolves.find(wolf => wolf.id !== playerId)
   
   let border = 'none'

   if (thisWerewolf.victimId === id) {
     border = '2px solid white'
   }

   if (otherWerewolf.victimId === id) {
     border = '2px solid blue'
   }
 
   const style = {
     backgroundColor: '#df1623',
     color: 'white',
     border
   }
  

  

  async function handleClick() {
   chooseVictim(id)
    
  }
   


 
  return (
    <button
            id={id} 
            style={style} 
            onClick={handleClick}> 
            {buttonText} 
    </button>
  )
}


export default WerewolfNightButton;