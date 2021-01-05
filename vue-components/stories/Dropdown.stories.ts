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
		tag: 'has error',
	},
	{
		label: 'later than',
		value: 'later',
		tag: 'has warning',
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
		computed: {
			error(): any {
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

export function all( ): Component {
	return {
		components: { Dropdown },
		data(): unknown {
			return {
				menuItems:menuItems,
				label: 'Label',
				selectedItem: null,
			};
		},
		computed: {
			error(): any {
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
			<div><div style="max-width: 512px">
				<Dropdown
					:label="label"
					:menu-items="menuItems"
					v-model="selectedItem"
					placeholder="Select an option"
					:disabled="disabled"
					:error="error"
				/>
				<div v-if="selectedItem" style="margin-top: 16px">
					Selected Option:
					<span class="selected-item-label">{{ selectedItem.label }}</span>
					(<span class="selected-item-id">{{ selectedItem.value }}</span>)
				</div>

				<p><Dropdown
				:label="label"
				:menu-items="menuItems"
				v-model="selectedItem"
				placeholder="Select an option"
				:disabled="true"
			/>
			<div v-if="selectedItem" style="margin-top: 16px">
				Selected Option:
				<span class="selected-item-label">{{ selectedItem.label }}</span>
				(<span class="selected-item-id">{{ selectedItem.value }}</span>)
			</div></p>

			<p><Dropdown
			:label="label"
			:menu-items="menuItems"
			v-model="selectedItem"
			placeholder="Select an option"
			:disabled="disabled"
			:error="{ type: 'error', message: 'There was an error 😕' }"
		/>
		<div v-if="selectedItem" style="margin-top: 16px">
			Selected Option:
			<span class="selected-item-label">{{ selectedItem.label }}</span>
			(<span class="selected-item-id">{{ selectedItem.value }}</span>)
		</div></p>

			<p><Dropdown
			:label="label"
			:menu-items="menuItems"
			v-model="selectedItem"
			placeholder="Select an option"
			:disabled="disabled"
			:error="{ type: 'warning', message: 'Warning to be careful 🚧' }"
		/>
		<div v-if="selectedItem" style="margin-top: 16px">
			Selected Option:
			<span class="selected-item-label">{{ selectedItem.label }}</span>
			(<span class="selected-item-id">{{ selectedItem.value }}</span>)
		</div></p>
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
