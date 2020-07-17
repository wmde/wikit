import HelloWorld from '@wmde/wikit-vue-components/src/components/HelloWorld';

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
