import HelloWorld from '@wmde/wikit-vue-components/src/components/HelloWorld';
import { text } from '@storybook/addon-knobs';

export default {
	title: 'Components/Dummy',
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
