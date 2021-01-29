import React from "react";

const PlayerAvatar = ({ playerName, avatar }) => {
  return (
    <div className="Header-Components player-avatar">
      <p style={{ margin: "0" }}>{playerName}</p>
      <img src={avatar} alt="player avatar" />
    </div>
  );
};

export default PlayerAvatar;
