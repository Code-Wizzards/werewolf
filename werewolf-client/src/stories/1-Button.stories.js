import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import PlayerList from '../Components/PlayerList'
import LobbyScreen from '../Components/LobbyScreen'

export default {
  title: 'Button',
  component: Button,
};

// export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

// export const Emoji = () => (
//   <Button onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );

export const playerList = () => (
  <PlayerList players={[{id:1, name:'test', status:'just hanging out'}, {id:2, name:'test2'}, {id:3, name:'test3'}]} />
)

export const lobbyScreen = () => (
  <LobbyScreen players={[{id:1, name:'test', status:'just hanging out'}, {id:2, name:'test2'}, {id:3, name:'test3'}]} />
)
