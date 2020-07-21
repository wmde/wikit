import { addDecorator, addParameters } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator( withA11y );

addDecorator( withKnobs );

addParameters( {
	// Inline stories render directly in the page you’re viewing (opposed to in an iframe),
	// which makes them faster.
	docs: {
		inlineStories: true,
	},
} );
