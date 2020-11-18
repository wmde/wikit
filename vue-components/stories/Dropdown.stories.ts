import Dropdown from '@/components/Dropdown';
import { Component } from 'vue';
import { MenuItem } from '@/components/MenuItem';

export default {
	component: Dropdown,
	title: 'Dropdown',
};

const menuItems: MenuItem[] = [
	{
		label: 'matching',
		value: 'matching',
	},
	{
		label: 'regardless of value',
		value: 'any',
	},
	{
		label: 'without',
		value: 'without',
	},
	{
		label: 'less than',
		value: 'less than',
	},
	{
		label: 'more than',
		value: 'more than',
	},
	{
		label: 'earlier than',
		value: 'earlier',
	},
	{
		label: 'later than',
		value: 'later',
	},
];

export function basic( args ): Component {
	return {
		components: { Dropdown },
		data(): unknown {
			return {
				selectedItem: null,
			};
		},
		props: Object.keys( args ),
		template: `
			<div><div style="max-width: 512px">
				<Dropdown
					:label="label"
					:menu-items="menuItems"
					v-model="selectedItem"
					:placeholder="placeholder"
					:disabled="disabled"
				/>
				<div v-if="selectedItem" style="margin-top: 16px">
					Selected Option:
					<span class="selected-item-label">{{ selectedItem.label }}</span>
					(<span class="selected-item-id">{{ selectedItem.value }}</span>)
				</div>
			</div></div>
		`,
	};
}

basic.args = {
	disabled: false,
	label: 'Label',
	placeholder: 'Select an option',
	menuItems,
};
basic.argTypes = {
	menuItems: {
		control: {
			disable: true,
		},
	},
	value: {
		control: {
			disable: true,
		},
	},
};
