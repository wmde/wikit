import { Checkbox, Icon } from '@/main';
import { Component } from 'vue';

export default {
	component: Checkbox,
	title: 'Checkbox',
};

export function basic( args: object ): Component {
	return {
		data(): object {
			return { checked: false };
		},
		components: { Checkbox, Icon },
		props: Object.keys( args ),
		template: `
			<div>
				<div>
					<Checkbox
						:label="label"
						:checked.sync="checked"
						:disabled="disabled"
					>
					</Checkbox>
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
		components: { Checkbox, Icon },
		template: `
			<div>
				<div>
					<Checkbox label="Checked" :checked="true"></Checkbox>
				</div>
				<br>
				<div>
					<Checkbox label="Unchecked" :checked="false"></Checkbox>
				</div>
				<br>
				<div>
					<Checkbox label="Checked disabled" :checked="true" disabled="disabled"></Checkbox>
				</div>
				<br>
				<div>
					<Checkbox label="Unchecked disabled" :checked="false" disabled="disabled"></Checkbox>
				</div>
				<br>
				<div dir="ltr">
					<Checkbox label="Unchecked with suffix icon" :checked="false">
						<template v-slot:suffix>
							<Icon type="info-outlined" size="medium" color="base"/>
						</template>
				</Checkbox>
				</div>
				<br>
				<div dir="ltr" style="max-width: 320px">
					<Checkbox label="This checkbox has a longer label to demonstrate the vertical alignment of the input at the top" :checked="false"></Checkbox>
				</Checkbox>
				</div>
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
