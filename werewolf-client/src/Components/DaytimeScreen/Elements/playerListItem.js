import React from "react";
import AccuseButton from "./accuseButton";


const PlayerListItem = (props) => {
 
  return (
    <div className="player-list-item">
      {props.playerName}
    <AccuseButton id={props.id}/>
    </div>
   
  );

   
};

export default PlayerListItem;
