import React from "react";

const RoleText = ({ userRole }) => {
  let colour;

  switch (userRole) {
    case "villager":
      colour = "#177173";
      break;

    case "werewolf":
      colour = "#df1623";
      break;

    case "healer":
      colour = "#7bdf7f";
      break;

    case "seer":
      colour = "#841f55";
      break;

    case "dead":
      colour = "#1B180E";
      break;

    default:
      colour = "white";
  }

  return (
    <p
      className="Header-Components"
      style={{
        background: `${colour}`,
        color: "white"
      }}
    >
      {userRole}
    </p>
  );
};

export default RoleText;
