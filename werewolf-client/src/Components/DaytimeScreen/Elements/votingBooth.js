import React, { useContext } from 'react';
import UserAvatar from './userAvatar';
import { GameContext } from "../../../gameManagers/game-manager";
import PlayerListItem from './playerListItem';

const VotingBooth = () => {
   const { players, setVote, userId } = useContext(GameContext);
   const theAccused = players.find(player => player.seconded);
   
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
    
      if (theAccused.id === userId) {
         alert('you cannot vote when you are standing trial')
      } else {
         setVote(vote)
      }

   }
   
   return(
      <div className='voting-booth-wrap'>
         <UserAvatar username={theAccused.name} avatar={"https://via.placeholder.com/150x120"} />
         <div className='vote-area'>
            <button id='kill' onClick={ () => handleClick('kill')}>kill</button>
            <button id='save' onClick={ () => handleClick('save')}>save</button>
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