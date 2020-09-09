import React from "react";

const PlayerListItem = (props) => {
  return (
    <div className="player-list-item">
      {props.player}
      <button> accuse </button>
    </div>
  );
};

export default PlayerListItem;
