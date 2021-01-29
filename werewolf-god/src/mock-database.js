const players = [  
  {
    id: 100,
    name: 'chris',
    role: 'werewolf'
  },
  {
    id: 200,
    name: 'lucy',
    role: 'villager'
  },
  {
    id: 300,
    name: 'anna',
    role: 'seer'
  },
   {
    id: 400,
    name: 'duke',
    role: 'villager'
  },
  {
    id: 500,
    name: 'billy',
    role: 'healer'
  },
  {
    id: 600,
    name: 'lionel',
    role: 'werewolf'
  },
  {
    id: 700,
    name: 'talulah',
    role: 'villager'
  }
]
 
 // created to push a new game into for create new game process.
 const games = [
   {
     id: 123,
     stage: 'lobby',
     players
   }
 ]

 module.exports = { games }


 /* 
  Player object
  Properties
    id | integer
    name | string
    role | string || villager, werewolf, seer, healer
    isPlayerAlive | bool
    voted | string || kill, save
    suspected | string || null, accused, seconded, killed, saved
    protected | bool default: false
    
    

*/