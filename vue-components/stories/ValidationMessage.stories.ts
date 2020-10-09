import ValidationMessage from '@/components/ValidationMessage';
import { Component } from 'vue';

export default {
	component: ValidationMessage,
	title: 'Message/ValidationMessage',
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
