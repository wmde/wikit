import { ToggleButton, ToggleButtonGroup } from '@/main';
import { Component } from 'vue';

export default {
	component: ToggleButton,
	title: 'ToggleButton',
};
const options = [
	{
		label: 'Pineapple',
		value: 'pineapple',
	},
	{
		label: 'Mushrooms',
		value: 'mushrooms',
	},
	{
		label: 'Spinach',
		value: 'spinach',
	},
	{
		label: 'Artichoke',
		value: 'artichoke',
	},
];
export function Basic( args: { label: string } ): Component {
	return {
		components: { ToggleButton },
		data(): unknown {
			return {
				isActive: false,
				label: 'Single ToggleButton',
			};
		},
		props: Object.keys( args ),
		template: `
			<div>
				<ToggleButton
				  :is-active="isActive"
				  @click="() => isActive = !isActive"
				>{{label}}</ToggleButton>
			</div>
		`,
	};
}
Basic.args = {
	label: 'Single ToggleButton',
};
Basic.argTypes = {
	isActive: {
		control: {
			disable: true,
		},
	},
};
export function All(): Component {
	return {
		components: { ToggleButton },
		data(): unknown {
			return {
				isActive: false,
			};
		},
		template: `
			<div>
				<ToggleButton
				  :is-active="isActive"
				  @click="() => isActive = !isActive"
				>Single Enabled ToggleButton</ToggleButton>
				<br>
				<br>
				<ToggleButton
					disabled
				>Single Disabled ToggleButton</ToggleButton>
			</div>
		`,
	};
}
export function Group(): Component {
	return {
		components: { ToggleButton, ToggleButtonGroup },
		data(): unknown {
			return {
				selectedOption: '',
				singleButtonIsActive: false,
			};
		},
		computed: {
			options(): unknown {
				return options;
			},
		},
		template: `
			<div dir="ltr">
				<div style="margin-top: 16px; font-family: sans-serif; color: #202122">
					Best topping on Pizza:
					<span v-if="selectedOption" class="selected-item-label">{{ selectedOption }}</span>
				</div>
				<br>
				<ToggleButtonGroup
					v-model="selectedOption"
				>
				  <template v-slot:default>
					<ToggleButton
					  v-for="option in options"
					  :value="option.value"
					  :key="option.value"
					>{{ option.label }}</ToggleButton>
				  </template>
				</ToggleButtonGroup>
				<br>
				<br>
				<ToggleButtonGroup>
					<template v-slot:default>
						<ToggleButton
							v-for="option in options"
							:value="option.value"
							:key="option.value"
							disabled
						>{{ option.label }}</ToggleButton>
					</template>
				</ToggleButtonGroup>
			</div>
		`,
	};
}
