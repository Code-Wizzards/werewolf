import React, { useState, useContext } from 'react'
import { GameContext } from '../../../../gameManagers/game-manager';


const HealerNightButton = ({id}) => {
  
   const { healPlayer } = useContext(GameContext)
   const [ buttonText, setButtonText ] = useState('heal')
  

  async function handleClick() {
    console.log('healer clicked at night')
    const result = await healPlayer(id)
    console.log(result)
    if (result.status === 200) {
      playerIsHealed()
    }
  }

  function playerIsHealed() {
    setButtonText('healed')
  }

 
  return (
    <button 
            id={id} 
            style={{ backgroundColor: '#7bdf7f'}} 
            onClick={handleClick}> 
            { buttonText } 
    </button>
  )
}


export default HealerNightButton;