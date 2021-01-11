import Checkbox from '@/components/Checkbox';
import { Component } from 'vue';

export default {
	component: Checkbox,
	// the `/` prefix in the title is needed for "Input" to appear as a folded navigation item, and not a headline
	title: 'Checkbox',
};

export function all(): Component {
	return {
		components: { Checkbox },
		template: `
			<div>
				<div><Checkbox label="Checked" :value="true" /></div>
				<br>
				<div><Checkbox label="Unchecked" :value="false" /></div>
				<br>
				<div><Checkbox label="Checked disabled" :value="true" disabled="disabled"/></div>
				<br>
				<div><Checkbox label="Unchecked disabled" :value="false" disabled="disabled"/></div>
			</div>
		`,
	};
}
