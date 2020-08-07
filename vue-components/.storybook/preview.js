import { addDecorator } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator( withA11y );

addDecorator( withKnobs );
