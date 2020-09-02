import React from "react";
import RoleInfo from "./RoleInfo";
import RoleImage from "./RoleImage";
import { Button } from '@material-ui/core';
import './RoleCard.css';

const RoleCard = ({ role }) => {
  
  let color;
  switch (role) {
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
      <h1 style={{color: color}}>{role}</h1>
      <RoleImage role={role} />
      <RoleInfo role={role} />
      </div>
      <Button color="primary" variant="contained" align="center">Ready!</Button>
    </div>
  );
};

export default RoleCard;
