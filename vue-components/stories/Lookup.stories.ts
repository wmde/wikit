import Lookup from '@/components/Lookup';
import { Component } from 'vue';
import { MenuItem } from '@/components/MenuItem';

export default {
	component: Lookup,
	title: 'Lookup',
};

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
];

export function all(): Component {
	return {
		components: { Lookup },
		data() {
			return {
				search: '',
				selectedItem: null,
			};
		},

		computed: {
			menuItems(): MenuItem[] {
				return vegetableItems.filter( ( item ) => item.label.includes( this.search ) );
			},
		},

		template: `
			<div>
				<Lookup
					:search-input.sync="search"
					label="Label"
					v-model="selectedItem"
					:menu-items="menuItems"
					placeholder="Placeholder"
					width="medium"
				/>
				<div v-if="selectedItem" style="margin-top: 16px">
					Selected vegetable:
					<span class="selected-item-label">{{ selectedItem.label }}</span>
					(<span class="selected-item-id">{{ selectedItem.value }}</span>)
				</div>
			</div>
		`,
	};
}
