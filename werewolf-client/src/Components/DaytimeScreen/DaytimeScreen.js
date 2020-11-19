import React, { useContext } from "react";
import "./daytime-screen-styles.css";
import Header from "./Containers/Header.js";
import GameZone from "./Containers/GameZone";
import GameLog from "./Containers/GameLog";


export default function DaytimeScreen({ userRole, username }) {

  return (
    <div className="daytime-screen">
      <Header
        userRole={userRole}
        username={username}
        avatar="https://via.placeholder.com/150x120"
      />
      <GameZone />
      <GameLog />
    </div>
  );
}

