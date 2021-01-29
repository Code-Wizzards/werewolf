import React from "react";
import RoleText from "../Elements/roleText.js";
import GameTime from "../Elements/gameTime.js";
import PlayerAvatar from "../Elements/playerAvatar.js";

const Header = ({ playerRole, playerName, avatar }) => {
  return (
    <div className="Header">
      <PlayerAvatar playerName={playerName} avatar={avatar} />
      <GameTime />
      <RoleText playerRole={playerRole} />
    </div>
  );
};

export default Header;
