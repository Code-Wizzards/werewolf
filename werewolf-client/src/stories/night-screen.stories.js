import React from 'react'
import GamePlayScreen from '../Components/GamePlayScreen/GamePlayScreen'
import { players } from './players'

export default {
  title: 'Night Screen',
  component: GamePlayScreen,
  args: {
    gameStage: 'running-night',
    username: 'Wes',
    players,
    nightActionCompleted: true
  }
}

const Template = args => <GamePlayScreen {...args} />

export const Villager = Template.bind({})
Villager.args = {
  playerRole: 'villager',
}

export const Werewolf = Template.bind({})
Werewolf.args = {
  playerRole: 'werewolf',
}

export const Seer = Template.bind({})
Seer.args = {
  playerRole: 'seer',
}

export const Healer = Template.bind({})
Healer.args = {
  playerRole: 'healer',  
}