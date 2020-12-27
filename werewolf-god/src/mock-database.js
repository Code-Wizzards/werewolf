const players = [  //TODO: not sure we use this but it may be useful to store all the users on the server, so we can assign ids better.
   {
     id: 100,
     name: 'chris Server'
   },
   {
     id: 200,
     name: 'lucy Server'
   },
   {
     id: 300,
     name: 'anna Server'
   },
    {
     id: 400,
     name: 'duke'
   },
   {
     id: 500,
     name: 'billy'
   },
   {
     id: 600,
     name: 'lionel'
   },
   {
   id: 700,
   name: 'talulah'
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