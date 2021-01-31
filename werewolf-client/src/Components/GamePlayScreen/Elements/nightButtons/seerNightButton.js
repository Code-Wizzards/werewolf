import React, { useState, useContext } from 'react'
import { GameContext } from '../../../../gameManagers/game-manager';


const SeerNightButton = ({ id, nightActionCompleted }) => {

   const { isPlayerWerewolf } = useContext(GameContext)
   const [ buttonText, setButtonText ] = useState('wolf?')
   
  const style =  {
    backgroundColor: nightActionCompleted ? '#874368' : '#841f55',
    color: nightActionCompleted ? '#b998aa' : 'white',
  } 


  async function handleClick() {
    const answer = await isPlayerWerewolf(id)
    answer ? playerIsWerewolf() : playerIsNotWerewolf()
  }

  function playerIsWerewolf() {
    setButtonText('YES')
  }

  function playerIsNotWerewolf() {
    setButtonText('NO')
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


export default SeerNightButton;