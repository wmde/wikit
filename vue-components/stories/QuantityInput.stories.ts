import QuantityInput from '@/components/QuantityInput';
import { Component } from 'vue';
import { MenuItem } from '../src/components/MenuItem';

const vegetableItems = [
	{
		label: 'potato',
		description: 'root vegetable',
		value: 'Q10998',
	},
	{
		label: 'carrot',
		description: 'root vegetable, usually orange in color',
		value: 'Q81',
		tag: 'limited support',
	},
	{
		label: 'zucchini',
		description: 'Edible summer squash, typically green in colour',
		value: 'Q7533',
	},
	{
		label: 'eggplant',
		description: 'plant species Solanum melongena',
		value: 'Q7540',
	},
	{
		label: 'broccoli',
		description: 'edible green plant in the cabbage family',
		value: 'Q47722',
	},
	{
		label: 'cauliflower',
		description: 'vegetable, for the plant see Q7537 (Brassica oleracea var. botrytis)',
		value: 'Q23900272',
	},
	{
		label: 'brussels sprouts',
		description: 'vegetable',
		value: 'Q150463',
	},
	{
		label: 'cassava root',
		description: 'root vegetable',
		value: 'Q43304555',
	},
	{
		label: 'plantain',
		description: 'banana-like vegetable, less sweet',
		value: 'Q165449',
	},
	{
		label: 'cabbage',
		description: 'Vegetable, the generic term for several varieties.',
		value: 'Q14328596',
	},
	{
		label: 'napa cabbage',
		description: 'a type of Chinese cabbage',
		value: 'Q13360268',
	},
];

export default {
	component: QuantityInput,
	title: 'Wikibase Components/QuantityInput',
};

export function basic(): Component {
	return {
		components: { QuantityInput },
		data() {
			return {
				search: '',
				selectedUnit: null,
				enteredNumber: null,
			};
		},
		computed: {
			menuItems(): MenuItem[] {
				return vegetableItems.filter( ( item ) => item.label.includes( this.search ) );
			},
		},
		template: `
			<div>
				<p>
					Number entered: {{ enteredNumber }}
				</p>
	      <p style="margin-top: 16px">
    	    Selected Unit:
					<span v-if="selectedUnit">
  	      <span class="selected-item-label">{{ selectedUnit.label }}</span>
	        (<span class="selected-item-id">{{ selectedUnit.value }}</span>)
						</span>
      	</p>
				<p>
					<QuantityInput 
						label="Value and Unit (optional)"
						numberInputPlaceholder="Enter a number"
						:number-input-value.sync="enteredNumber"
            unit-lookup-label="Unit (optional)"
						unitLookupPlaceholder="Enter a unit"
						:unit-lookup-menu-items="menuItems"
            :unit-lookup-search-input.sync="search"
						:unit-lookup-value.sync="selectedUnit"
					/>
				</p>
			</div>
		`,
	};
}

export function all(): Component {
	return {
		components: { QuantityInput },
		template: `
			<div>
				<p>
					<QuantityInput 
						label="Value and Unit (optional)"
						numberInputPlaceholder="Enter a number"
            unit-lookup-label="Unit (optional)"
						unitLookupPlaceholder="Enter a unit"
					  :unit-lookup-menu-items="[]"
					 	unit-lookup-search-input=""
						:error="{type: 'error', message: 'message'}"
					/>
				</p>
			</div>
		`,
	};
}
