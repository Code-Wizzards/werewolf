import React, { useState, useContext } from 'react'
import { GameContext } from '../../../../gameManagers/game-manager';


const WerewolfNightButton = ({userRole, id}) => {
  
   const { killPlayer } = useContext(GameContext)
   const [ buttonText, setButtonText ] = useState('kill')
   
   const style = {
     backgroundColor: '#df1623',
     color: 'white'
   }
  
   
   
  

  async function handleClick() {
   console.log('werewolf clicked kill')
    
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