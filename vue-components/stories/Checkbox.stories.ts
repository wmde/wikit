import Checkbox from '@/components/Checkbox';
import { Component } from 'vue';

export default {
	component: Checkbox,
	title: 'Checkbox',
};

export function basic( args ): Component {
	return {
		data(): object {
			return { checked: false, };
		},
		components: { Checkbox },
		props: Object.keys( args ),
		template: `
			<div>
				<div>
					<Checkbox
						:label="label"
						:checked.sync="checked"
						:disabled="disabled"
					/>
				</div>
				<p>
					The checkbox is checked: {{ checked ? 'true' : 'false' }}
				</p>
			</div>
		`,
	};
}

export function all(): Component {
	return {
		components: { Checkbox },
		template: `
			<div>
				<div><Checkbox label="Checked" :checked="true" /></div>
				<br>
				<div><Checkbox label="Unchecked" :checked="false" /></div>
				<br>
				<div><Checkbox label="Checked disabled" :checked="true" disabled="disabled"/></div>
				<br>
				<div><Checkbox label="Unchecked disabled" :checked="false" disabled="disabled"/></div>
			</div>
		`,
	};
}

basic.args = {
	disabled: false,
	label: 'Label',
};
basic.argTypes = {
	disabled: {
		control: {
			type: 'boolean',
		},
	},
	label: {
		control: {
			type: 'text',
		},
	},
	value: {
		control: {
			disable: true,
		},
	},
	checked: {
		control: {
			disable: true,
		},
	},
};
