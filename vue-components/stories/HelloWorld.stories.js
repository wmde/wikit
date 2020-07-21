import HelloWorld from '../src/components/HelloWorld';

export default {
	component: HelloWorld,
	title: 'Hello World',
};

export function dummy() {
	return {
		components: { HelloWorld },
		template: `<HelloWorld msg="hello world" />`,
	}
}
