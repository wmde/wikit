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
				<br>
				<TogglePoC
				  :options="[{label: 'single option', value: 'unclear if needed here'}]"
				  :value="false"
				/>
			</div>
		`,
	};
}
