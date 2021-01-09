import React, { useContext, createContext } from 'react';
import WithContext from 'react-with-context';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import RoleCard from '../Components/RoleCard/RoleCard';

export default {
  title: 'Role Cards',
  component: RoleCard,
};


const { updateIsPlayerAlive,  gameStage, isPlayerAlive, userRole } = useContext(GameContext)

// ?? how can we mock game context 

export const roleCardWolf = () => {
   const GameContext = {
      userRole: 'werewolf'
   }
  return (<WithContext context={GameContext}><RoleCard /></WithContext>)
}

export const roleCardVillager = () => (
  <RoleCard />
)

export const roleCardHealer = () => (
  <RoleCard  />
)

export const roleCardSeer = () => (
  <RoleCard  />
)