import { addDecorator } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';


addDecorator( withA11y );

addDecorator( withKnobs );

export const parameters = {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  };