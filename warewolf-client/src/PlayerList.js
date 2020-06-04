import React from 'react'

const PlayerList = ({players}) => {
  const playerRows = players.map(player => <li key={player.id}>{player.name}</li>)

  return (
    <div className='user-list'>
      <ul>
        {playerRows}
      </ul>
    </div>
  )
}

export default PlayerList