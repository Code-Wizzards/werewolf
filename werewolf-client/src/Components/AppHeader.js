import React, { useContext } from 'react';
import { GameContext } from '../gameManagers/game-manager';
import Title from './Title';
import '../CSS/App.css';


const AppHeader = () => {
  const { errors } = useContext(GameContext);
  
  let errorMessages = [];
  if (errors.length) {
    for (let i = 0; i < errors.length; i++) {
    errorMessages.push(<p key={i}>{errors[i].message}</p>)
    }
  }

  return (
    <>
      <Title />
      <div id="errors">
      {errorMessages}
      </div>
    </>
  )




}
 
export default AppHeader;
