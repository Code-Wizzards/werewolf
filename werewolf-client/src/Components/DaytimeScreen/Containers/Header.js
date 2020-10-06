import React from "react";
import RoleText from "../Elements/roleText.js";
import GameTime from "../Elements/gameTime.js";
import UserAvatar from "../Elements/userAvatar.js";

const Header = ({ userRole, username, avatar }) => {
  return (
    <div className="Header">
      <UserAvatar username={username} avatar={avatar} />
      <GameTime />
      <RoleText userRole={userRole} />
    </div>
  );
};

export default Header;
