import React, { useContext } from "react";
import { GameContext } from '../../../gameManagers/game-manager';


const AccuseButton = (props) => {
  const { id } = props;
  const { players, playerAccused } = useContext(GameContext);
  const accusedPlayers = players.filter(player => player.accused);
  let buttonText; 
  let color;
    if (accusedPlayers.filter(player => player.id === id)[0]) {
      buttonText = "second";
      color = "#16A9DF";
    } else {
      buttonText = "accuse";
      color = "#df1623";
    }

    return (
      <button id={id} style={{ backgroundColor: color }} onClick={ () => {playerAccused(id) }}> { buttonText } </button>
    )
}


export default AccuseButton;