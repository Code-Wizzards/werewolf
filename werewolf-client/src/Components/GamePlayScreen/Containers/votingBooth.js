import React, { useContext } from 'react';
import PlayerAvatar from '../Elements/playerAvatar';
import { GameContext } from "../../../gameManagers/game-manager";
import PlayerListItem from '../Elements/playerListItem';
import { Button } from '@material-ui/core';

const VotingBooth = () => {
   const { players, setVote, playerId } = useContext(GameContext);
   const theAccused = players.find(player => player.suspected === 'seconded');
   const isThisPlayerTheAccused = theAccused.id === playerId;
   
   const playersVotedKill = players.filter(player => player.voted === 'kill');
   const playersVotedKillList = playersVotedKill.map(player => 
      <PlayerListItem playerName={player.name} key={player.id} id={player.id}/>
   )

   const playersVotedSave = players.filter(player => player.voted === 'save');
   const playersVotedSaveList = playersVotedSave.map(player => 
      <PlayerListItem playerName={player.name} key={player.id} id={player.id}/>
   )
   
   const killCount = playersVotedKill.length;
   const saveCount = playersVotedSave.length;

   const handleClick = (vote) => {
    
      if (theAccused.id === playerId) {
         alert('you cannot vote for yourself')
      } else {
         setVote(vote)
      }  

   }
   
   return(
      <div className='voting-booth-wrap'>
         <PlayerAvatar playerName={theAccused.name} avatar={"https://via.placeholder.com/150x120"} />
         <div className='vote-area'>
            <Button id='kill' onClick={ () => handleClick('kill')} disabled={isThisPlayerTheAccused} color="secondary" variant="contained" align="center" size="small">kill</Button>
            <Button id='save' onClick={ () => handleClick('save')} disabled={isThisPlayerTheAccused} color="primary" variant="contained" align="center" size="small">save</Button>
            <p className='kill vote-count' id='killCount'>{killCount}</p>
            <p className='save vote-count' id='saveCount'>{saveCount}</p>
            <div className="kill-list">
               {playersVotedKillList}
            </div>
            <div className="save-list">
               {playersVotedSaveList}
            </div>
         </div>
      </div>
     
   )
}

export default VotingBooth;