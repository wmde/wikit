import ToggleButton from '@/components/ToggleButton';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
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
export function ProofOfConcept(): Component {
	return {
		components: { ToggleButton, ToggleButtonGroup },
		data(): unknown {
			return {
				selectedOption: '',
			};
		},
		computed: {
			options() {
				return options;
			},
		},
		template: `
			<div>
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
					  :label="option.label"
					  :value="option.value"
					/>
				  </template>
				</ToggleButtonGroup>
			</div>
		`,
	};
}
