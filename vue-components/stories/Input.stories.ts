import Input from '@/components/Input';
import { Component } from 'vue';

export default {
	component: Input,
	// the `/` prefix in the title is needed for "Input" to appear as a folded navigation item, and not a headline
	title: '/Input/Basic',
};

export function all(): Component {
	return {
		components: { Input },
		template: `
			<div>
				<p><Input placeholder="Placeholder text" /></p>
				<p><Input feedback-type="warning" placeholder="Placeholder text" /></p>
				<p><Input feedback-type="error" placeholder="Placeholder text" /></p>
				<p><Input disabled="disabled" placeholder="Placeholder text (disabled)" /></p>
			</div>
		`,
	};
}
