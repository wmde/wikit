import { addDecorator, addParameters } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import './storybook-global.scss';

addDecorator( withA11y );

addParameters( {
	docs: {
		inlineStories: true,
	},
} );
