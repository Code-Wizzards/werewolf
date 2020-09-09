import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import DaytimeScreen from '../Components/DaytimeScreen/DaytimeScreen';

export default {
  title: 'Daytime Screen',
  component: DaytimeScreen,
};

// export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

// export const Emoji = () => (
//   <Button onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );

export const DaytimeScreenStory = () => (
  <DaytimeScreen />
)


// how to mimic useContext?