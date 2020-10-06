import React from "react";

const RoleInfo = ({ userRole }) => {
 
  if (userRole === "villager") {
    return (
      <p>
       Your village is under attack from Werewolves! Each day
        you must discuss who could be a werewolf and vote to kill or save a suspect.
        The villagers win if they find and kill all the werewolves. Villagers
        can accuse another player, second someone else's vote and vote on the
        suspect. Villagers sleep all through the night.
      </p>
    );
  }

  if (userRole === "werewolf") {
    return (
      <p>
        You appear human but you're really a blood-thirsty beast. You and your
        werewolf friend want to slowly kill all the villagers, one a night. In
        the day, act as a villager, You can accuse another player of being a
        werewolf, second someone else's vote and vote on the suspect. At night,
        you and your werewolf-in-crime will secretly communicate to decide which
        villager to kill. Lie well; don't let anyone get suspicious of your true
        nature. Werewolves win when an equal number of villagers and werewolves remain.
      </p>
    )
  }

  if (userRole === "seer") {
    return (
      <p>
       You are a villager with a special power: the ability to know the truth by moonlight.  
       Your village is under attack from Werewolves but you can use your powers to help save your fellow villagers. 
       Each day you must discuss who could be a werewolf and vote to kill or save a suspect.
       The villagers win if they find and kill all the werewolves. As the Seer, you will wake each night at midnight 
       when the moon is full to find out the truth about one other player. Be careful at giving away your true identity, 
       werewolves are known to particularly enjoy Seer flesh...
      </p>
    )
  }

  if (userRole === "healer") {
    return (
      <p>
      You are a villager with a special power: the ability to bring someone back from the brink of death. 
      </p>
    )
  }
    else {
      return (
        <p>Could not match role</p>
      )
    }

}

export default RoleInfo;
