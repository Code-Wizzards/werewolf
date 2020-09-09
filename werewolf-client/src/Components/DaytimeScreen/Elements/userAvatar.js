import React from "react";

const UserAvatar = ({ username, avatar }) => {
  return (
    <div className="Header-Components user-avatar">
      <p style={{ margin: "0" }}>{username}</p>
      <img src={avatar} alt="user avatar" />
    </div>
  );
};

export default UserAvatar;
