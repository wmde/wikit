import TextInput from '@/components/TextInput';
import Icon from '@/components/Icon';
import { Component } from 'vue';

export default {
	component: TextInput,
	// the `/` prefix in the title is needed for "Input" to appear as a folded navigation item, and not a headline
	title: '/Input/TextInput',
};

export function all(): Component {
	return {
		components: { TextInput, Icon },
		template: `
			<div>
				<p>
					<TextInput label="Label" placeholder="Placeholder"></TextInput>
				</p>
				<p>
					<TextInput label="Label" disabled="disabled" placeholder="Placeholder"></TextInput>
				</p>
				<p>
					<TextInput label="Label" :error="{ type: 'error', message: 'Inline error message' }" placeholder="Placeholder"></TextInput>
				</p>
				<p>
					<TextInput label="Label" :error="{ type: 'warning', message: 'Warning message' }" placeholder="Placeholder"></TextInput>
				</p>
				<p dir="ltr">
					<TextInput label="Label with icon suffix" placeholder="Placeholder">
						<template v-slot:suffix>
							<Icon type="info-outlined" size="small" color="base"/>
						</template>
					</TextInput>
				</p>
			</div>
		`,
	};
}
