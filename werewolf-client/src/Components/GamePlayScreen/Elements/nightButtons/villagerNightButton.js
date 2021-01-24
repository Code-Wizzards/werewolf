import React, { useState, useContext } from 'react'



const VillagerNightButton = ({id}) => {

   
   const style = {
     backgroundColor: '#177173',
     color: '#ffffff3d'
   }
   
  return (
    <button disabled={true}
            id={id} 
            style={style}>
            ACCUSE
    </button>
  )
}


export default VillagerNightButton;