import HelloWorld from '@wmde/wikit-vue-components/src/components/HelloWorld';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

export default {
	title: 'Components/Dummy',
	decorators: [ withKnobs, withA11y ],
};

export function withText() {
	return {
		components: { HelloWorld },
		props: {
			msg: {
				default: text( 'Message', 'Hello World!!1' ),
			},
		},
		template: `
			<p>
				<HelloWorld :msg="msg"/>
			</p>`,
	};
}
