import { HelloWorld } from '@wmde/wikit-vue-components';

export default {
	title: 'Components/Dummy',
};

export function withText() {
	return {
		components: { HelloWorld },
		template: `
			<p>
				<HelloWorld msg="hello world"/>
			</p>`,
	};
}
