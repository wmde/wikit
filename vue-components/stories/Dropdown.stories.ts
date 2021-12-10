import { Dropdown, Icon } from '@/main';
import { Component } from 'vue';
import { MenuItem } from '@/components/MenuItem'; // eslint-disable-line no-restricted-imports

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
		tag: 'has error',
	},
	{
		label: 'later than',
		value: 'later',
		tag: 'has warning',
	},
];

export function basic( args: object ): Component {
	return {
		components: { Dropdown, Icon },
		data(): unknown {
			return {
				selectedItem: null,
			};
		},
		computed: {
			error(): unknown {
				if ( this.selectedItem?.value === 'later' ) {
					return { type: 'warning', message: 'Warning to be careful 🚧' };
				}
				if ( this.selectedItem?.value === 'earlier' ) {
					return { type: 'error', message: 'There was an error 😕' };
				}
				return null;
			},
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
					:error="error"
				>
				</Dropdown>
				<div v-if="selectedItem" style="margin-top: 16px; font-family: sans-serif; color: #202122">
					Selected Option:
					<span class="selected-item-label">{{ selectedItem.label }}</span>
					(<span class="selected-item-id">{{ selectedItem.value }}</span>)
				</div>
			</div></div>
		`,
	};
}

export function all(): Component {
	return {
		components: { Dropdown, Icon },
		data(): unknown {
			return {
				label: 'Label',
				selectedItem: null,
				menuItems: [
					{
						label: 'carrot',
						description: 'root vegetable, usually orange in color',
						value: 'Q81',
					},
				],
			};
		},
		computed: {
			error(): unknown {
				if ( this.selectedItem?.value === 'later' ) {
					return { type: 'warning', message: 'Warning to be careful 🚧' };
				}
				if ( this.selectedItem?.value === 'earlier' ) {
					return { type: 'error', message: 'There was an error 😕' };
				}
				return null;
			},
		},
		template: `
			<div style="max-width: 512px">
				<p>
					<Dropdown
						:label="label"
						:menu-items="menuItems"
						v-model="selectedItem"
						placeholder="Select an option"
						:error="error"
					>
					</Dropdown>
				</p>
				<p>
					<Dropdown
						:label="label"
						:menu-items="menuItems"
						v-model="selectedItem"
						placeholder="Select an option"
						:disabled="true"
					>
					</Dropdown>
				</p>
				<p>
					<Dropdown
					:label="label"
					:menu-items="menuItems"
					v-model="selectedItem"
					placeholder="Select an option"
					:error="{ type: 'error', message: 'There was an error 😕' }"
					>
					</Dropdown>
				</p>
				<p>
					<Dropdown
					:label="label"
					:menu-items="menuItems"
					v-model="selectedItem"
					placeholder="Select an option"
					:error="{ type: 'warning', message: 'Warning to be careful 🚧' }"
					>
					</Dropdown>
				</p>
				<p dir="ltr">
					<Dropdown
						label="Label with suffix icon"
						:menu-items="menuItems"
						v-model="selectedItem"
						placeholder="Select an option"
						:error="error"
					>
					<template v-slot:suffix>
						<Icon type="info-outlined" size="medium" color="base"/>
					</template>
					</Dropdown>
				</p>
			</div>
		`,
	};
}

all.parameters = {
	controls: { hideNoControlsWarning: true },
};

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
