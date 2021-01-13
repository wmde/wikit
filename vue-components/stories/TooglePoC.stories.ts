import TogglePoC from '@/components/TogglePoC';
import { Component } from 'vue';
import { MenuItem } from '../src/components/MenuItem';

export default {
	component: TogglePoC,
	title: 'TogglePoC',
};
const options = [
	{
		label: 'Pineapple',
		value: 'pineapple',
		checked: true,
	},
	{
		label: 'Mushrooms',
		value: 'mushrooms',
		checked: false,
	},
	{
		label: 'Spinach',
		value: 'spinach',
		checked: false,
	},
	{
		label: 'Artichoke',
		value: 'artichoke',
		checked: false,
	},
];
export function ProofOfConcept(): Component {
	return {
		components: { TogglePoC },
		data(): unknown {
			return {
				selectedOption: null,
			};
		},
		computed: {
			options() {
				return options;
			},
		},
		template: `
			<div>
				<TogglePoC
					:options="options"
					v-model="selectedOption"
				/>
				<div style="margin-top: 16px; font-family: sans-serif; color: #202122">
					Best topping on Pizza:
					<span v-if="selectedOption" class="selected-item-label">{{ selectedOption }}</span>
				</div>
			</div>
		`,
	};
}
