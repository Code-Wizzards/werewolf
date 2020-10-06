import React from "react";

const RoleImage = ({ userRole }) => {
  let roleImage;

  switch (userRole) {
    case "villager":
      roleImage =
        "../../images/villager-role-image.png"
        // "https://i.pinimg.com/474x/77/7d/bc/777dbc1a74364dbd147f64bfa8078b50.jpg";
      break;

    case "werewolf":
      roleImage =
      "../../images/brown-wolf.png"
        // "https://image.freepik.com/free-vector/cartoon-werewolf-waving-hand_157186-207.jpg";
      break;

    case "seer":
       roleImage =
      "../../images/seer-role-image.png"
       break;
    
    case "healer":
      roleImage =
      "../../images/healer-role-image.png"
      break;

    default:
      console.log("error");
  }

  return <img alt="your role" src={roleImage} style={{maxHeight: "350px"}} />;
};

export default RoleImage;
