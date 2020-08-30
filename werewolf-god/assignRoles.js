function assignRoles (playerList) {
  const numPlayers = playerList.length
  let rolePool = ['werewolf', 'werewolf', 'seer', 'healer']

  while (rolePool.length < numPlayers) {
    rolePool.push('villager')
  }

  return playerList.map(player => {
    const roleNumber = Math.floor(Math.random() * rolePool.length)
    const role = rolePool[roleNumber]
    rolePool.splice(roleNumber, 1)
    return {...player, role}
  })
}

module.exports = { assignRoles }