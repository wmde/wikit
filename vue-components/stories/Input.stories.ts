import Input from '@/components/Input';
import { Component } from 'vue';

export default {
	component: Input,
	title: 'Input/Basic',
};

export function all(): Component {
	return {
		components: { Input },
		template: `
			<div>
				<p><Input placeholder="Placeholder text" /></p>
				<p><Input feedback-type="warning" placeholder="Placeholder text" /></p>
				<p><Input feedback-type="error" placeholder="Placeholder text" /></p>
			</div>
		`,
	};
}
