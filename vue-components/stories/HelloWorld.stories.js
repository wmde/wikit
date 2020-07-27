import HelloWorld from '../src/components/HelloWorld';
import { text } from '@storybook/addon-knobs';

export default {
	component: HelloWorld,
	title: 'Hello World',
};

export function dummy() {
	return {
		components: { HelloWorld },
		props: {
			message: {
				default: text( 'Message', 'Hello World!!1' ),
			},
		},
		template: `<HelloWorld :msg="message" />`,
	}
}
