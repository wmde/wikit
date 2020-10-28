import LookupMenu from '@/components/LookupMenu';
import { Component } from 'vue';
import { MenuItem } from '@/components/MenuItem';

export default {
	component: LookupMenu,
	title: '/Lookup/LookupMenu',
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

export function withItems(): Component {
	return {
		components: { LookupMenu },
		computed: {
			menuItems(): MenuItem[] {
				return vegetableItems;
			},
		},

		template: `
			<div>
				<LookupMenu
					:menu-items="menuItems"
				>
				</LookupMenu>
			</div>
		`,
	};
}

export function noItems(): Component {
	return {
		components: { LookupMenu },

		template: `
			<div>
				<LookupMenu
					:menu-items="[]"
				>
                  <template v-slot:no-results>
                    <em>Nothing</em> was found! 😢
                  </template>
				</LookupMenu>
			</div>
		`,
	};
}
