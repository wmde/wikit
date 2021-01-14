import Checkbox from '@/components/Checkbox';
import { Component } from 'vue';

export default {
	component: Checkbox,
	title: 'Checkbox',
};

export function basic( args ): Component {
	return {
		data(): object {
			return { args };
		},
		components: { Checkbox },
		props: Object.keys( args ),
		template: `
			<div>
			<div><Checkbox 
			:label="label" 
			:value="false" 
			:disabled="disabled"/></div>
			</div>
		`,
	};
}

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
		control:{
			disable:true,
		}
	},
	nativeValue: {
		control:{
			disable:true,
		}
	}
};
