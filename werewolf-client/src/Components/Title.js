import './Title.css';
import React, { useContext } from 'react';
import { GameContext } from '../gameManagers/game-manager'

const Title =() => {
  
  return (
    <div className='title'>
     <h1>werewolf</h1>
    </div>
  )
}

export default Title;