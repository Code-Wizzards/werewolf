import React, { useState, useContext } from 'react'
import { GameContext } from '../../../../gameManagers/game-manager';


const HealerNightButton = ({id, nightActionCompleted}) => {
  
  const { healPlayer } = useContext(GameContext)
  const [ buttonText, setButtonText ] = useState('heal')

  const style = { 
                color: nightActionCompleted ? '#b3fac0' : 'white',
                backgroundColor: nightActionCompleted ? '#8ccb8f' : '#7bdf7f',
  }


  async function handleClick() {
    const playerIsHealed = await healPlayer(id)
    let buttonText = playerIsHealed ? 'Healed' : 'Heal'
    setButtonText(buttonText)

  }
 
  return (
    <button 
            disabled={nightActionCompleted}
            id={id} 
            style={style} 
            onClick={handleClick}> 
            { buttonText } 
    </button>
  )
}


export default HealerNightButton;