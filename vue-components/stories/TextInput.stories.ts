import TextInput from '@/components/TextInput';
import { Component } from 'vue';

export default {
	component: TextInput,
	title: 'Input/TextInput',
};

export function all(): Component {
	return {
		components: { TextInput },
		template: `
			<div>
				<p><TextInput label="Label" placeholder="Placeholder" width="small" /></p>
				<p><TextInput label="Label" disabled="disabled" placeholder="Placeholder" /></p>
				<p><TextInput label="Label" placeholder="Placeholder" width="large" /></p>
				<p><TextInput label="Label" placeholder="Placeholder" width="full-width" /></p>
				<p><TextInput label="Label" :error="{ type: 'error', message: 'Inline error message' }" placeholder="Placeholder" width="small" /></p>
				<p><TextInput label="Label" :error="{ type: 'warning', message: 'Warning message' }" placeholder="Placeholder" /></p>
			</div>
		`,
	};
}
