import React from "react";

const RoleInfo = ({ role }) => {
  if (role === "villager") {
    return (
      <p>
        You are human and your village is under attack from Werewolves! Each day
        you must discuss who could be a werewolf and vote to kill or save a suspect.
        The villagers win if they find and kill all the werewolves. Villagers
        can accuse another player, second someone else's vote and vote on the
        suspect. Villagers sleep all through the night.
      </p>
    );
  }

  if (role === "werewolf") {
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

  if (role === "seer") {
    return (
      <p>
       You are a villager with a special power: the ability to know the truth by moonlight.
      </p>
    )
  }

  if (role === "healer") {
    return (
      <p>
      You are a villager with a special power: the ability to bring someone back from the brink of death.
      </p>
    )
  }

}

export default RoleInfo;
