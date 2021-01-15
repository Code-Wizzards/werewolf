import React from 'react'
import { addDecorator } from '@storybook/react'

import { withConsole } from '@storybook/addon-console'
import { withA11y } from '@storybook/addon-a11y'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  } // sorts alphabetically
}

// Adding decorators and theming stories in  v5:
// addDecorator(story => (
//   <ThemeProvider theme={theme}>
//   <CSSReset /> {/* can use this to strip the defaults, in which case wrapping story in Box may be useful to give some margin tho doesn't seem necessary here */}
//   {story()}
//   </ThemeProvider>
// ))

// in v6 we can do:

// export const decorators = [
//   (Story) => (
//     <ThemeProvider theme={theme}>
//       <CSSReset />
//       <Story />
//     </ThemeProvider>
//   )
// ]

addDecorator((storyFn, context) => withConsole()(storyFn)(context)) // better logging
addDecorator(withA11y) // accessibility testing tools