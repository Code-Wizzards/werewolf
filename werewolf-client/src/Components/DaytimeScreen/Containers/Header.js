import React from "react";
import RoleText from "../Elements/roleText.js";
import GameTime from "../Elements/gameTime.js";
import UserAvatar from "../Elements/userAvatar.js";

const Header = ({ role, username, avatar }) => {
  return (
    <div className="Header">
      <UserAvatar username={username} avatar={avatar} />
      <GameTime />
      <RoleText role={role} />
    </div>
  );
};

export default Header;
