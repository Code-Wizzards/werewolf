import React from "react";
import "./daytime-screen-styles.css";
import Header from "./Containers/Header.js";
import GameZone from "./Containers/GameZone";
import GameLog from "./Containers/GameLog";

export default function DaytimeScreen({ userRole, userName }) {
  return (
    <div className="daytime-screen">
      <Header
        userRole={userRole}
        username={userName}
        avatar="https://via.placeholder.com/150x120"
      />
      <GameZone />
      <GameLog />
    </div>
  );
}


// to do :  hook up with user details