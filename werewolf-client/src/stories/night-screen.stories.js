import React from 'react'
import GamePlayScreen from '../Components/GamePlayScreen/GamePlayScreen'
import { players } from './players'

export default {
  title: 'Night Screen',
  component: GamePlayScreen,
  args: {
    gameStage: 'running-night',
    username: 'Wes',
    players
  }
}

const Template = args => <GamePlayScreen {...args} />

export const Villager = Template.bind({})
Villager.args = {
  userRole: 'villager',
}

export const Werewolf = Template.bind({})
Werewolf.args = {
  userRole: 'werewolf',
}

export const Seer = Template.bind({})
Seer.args = {
  userRole: 'seer',
}

export const Healer = Template.bind({})
Healer.args = {
  userRole: 'healer',  
}