import React, {useContext } from "react";
import { GameContext } from '../../gameManagers/game-manager'
import RoleInfo from "./Elements/RoleInfo";
import RoleImage from "./Elements/RoleImage";
import { Button } from '@material-ui/core';
import './RoleCard.css';

const RoleCard = () => {


  const { updateIsPlayerAlive,  gameStage, isPlayerAlive, playerRole } = useContext(GameContext)

 
  let color;
  switch (playerRole) {
    case "villager":
      color = "#177173";
      break;

    case "werewolf":
      color = "#df1623";
      break;

    case "healer":
      color = "#45b048";
      break;

    case "seer":
      color = "#841f55";
      break;

    case "dead":
      color = "#1B180E";
      break;

    default:
      color = "white";
  }


  return (
    <div className="rolecard-container">
    <div className="RoleCard">
      <h1 style={{color: color}}>{playerRole}</h1>
      <RoleImage playerRole={playerRole} />
      <RoleInfo playerRole={playerRole} />
      </div>
      <Button onClick={() => updateIsPlayerAlive() } disabled={isPlayerAlive} color="primary" variant="contained" align="center">Ready!</Button>
      {gameStage !== "running" ? <p className="info">Waiting for all players to click ready</p> : ""}
   </div>
  );
};

export default RoleCard;
