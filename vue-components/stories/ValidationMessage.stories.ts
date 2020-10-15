import ValidationMessage from '@/components/ValidationMessage';
import { Component } from 'vue';

export default {
	component: ValidationMessage,
	// the `/` prefix in the title is needed for "Message" to appear as a folded navigation item, and not a headline
	title: '/Message/ValidationMessage',
};

export function all(): Component {
	return {
		components: { ValidationMessage },
		template: `
			<div>
				<p><ValidationMessage type="error" message="something went very wrong" /></p>
				<p><ValidationMessage type="warning" message="something went slightly wrong" /></p>
			</div>
		`,
	};
}
