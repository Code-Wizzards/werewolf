import React, { useState, useContext } from 'react'
import { GameContext } from '../../../../gameManagers/game-manager';


const SeerNightButton = ({ id }) => {

   const { isPlayerWerewolf } = useContext(GameContext)
   const [ buttonText, setButtonText ] = useState('wolf?')
   
  const style =  {
    backgroundColor: '#841f55',
    color: 'white'
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
            id={id} 
            style={style} 
            onClick={handleClick}> 
            { buttonText } 
    </button>
  )
}


export default SeerNightButton;