import React, { useContext } from 'react'
import { GameContext } from '../../../gameManagers/game-manager';


const NightButton = ({userRole, id}) => {
  
   const { isPlayerWerewolf, healPlayer } = useContext(GameContext);
   
   let backgroundColor, buttonText
   let fontColor = 'white'

  if (userRole === 'villager') {
      buttonText = 'accuse'
      fontColor = '#ffffff3d'
      backgroundColor = '#177173'
   }

   if (userRole === 'werewolf') {
     buttonText = 'kill'
     backgroundColor = '#df1623'
   }
   
   if (userRole === 'healer') {
     buttonText = 'heal'
     backgroundColor = '#7bdf7f'
   }

   if (userRole === 'seer') {
    buttonText = 'werewolf?'
    backgroundColor = '#841f55'
  }

  async function handleClick() {
    if (userRole === 'seer') {
      console.log('seer clicked at night')
      const answer = await isPlayerWerewolf(id)
      buttonText = answer ? 'YES' : 'NO'
    }

    if (userRole === 'healer') {
      console.log('healer clicked at night')
      const result = await healPlayer(id)
      if (result.protected) {
        buttonText = 'HEALED'
      }
    }
   }


 
  return (
    <button disabled={userRole === 'villager'? true : false } 
            id={id} 
            style={{ backgroundColor, color: fontColor }} 
            onClick={handleClick}> 
            { buttonText } 
    </button>
  )
}


export default NightButton;