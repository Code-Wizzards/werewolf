import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import RoleCard from '../Components/RoleCard/RoleCard';

export default {
  title: 'Role Cards',
  component: RoleCard,
};

// export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

// export const Emoji = () => (
//   <Button onClick={action('clicked')}>
//     <span userRole="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );

export const roleCardWolf = () => (
  <RoleCard userRole={"werewolf"} />
)

export const roleCardVillager = () => (
  <RoleCard userRole={"villager"} />
)

export const roleCardHealer = () => (
  <RoleCard userRole={"healer"} />
)

export const roleCardSeer = () => (
  <RoleCard userRole={"seer"} />
)