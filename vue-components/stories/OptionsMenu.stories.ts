import OptionsMenu from '@/components/OptionsMenu';
import { Component } from 'vue';
import { MenuItem } from '@/components/MenuItem';

export default {
	component: OptionsMenu,
	title: 'OptionsMenu',
};

const vegetableItems = [
	{
		label: 'potato',
		description: 'root vegetable',
		value: 'Q10998',
		tag: 'limited support'
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
		label: 'tomato',
		value: 'Q20638126',
	},
	{
		label: 'potato',
		description: '',
		value: 'Q16587531',
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

export function withItems( args: { boldLabels: boolean, selectedItemIndex: number } ): Component {
	return {
		components: { OptionsMenu },
		computed: {
			menuItems(): MenuItem[] {
				return vegetableItems;
			},
		},
		props: Object.keys( args ),
		template: `
			<div>
				<OptionsMenu
					:menu-items="menuItems"
					:bold-labels="boldLabels"
					:selected-item-index="selectedItemIndex"
				>
				</OptionsMenu>
			</div>
		`,
	};
}

withItems.args = {
	boldLabels: true,
};
withItems.argTypes = {
	menuItems: {
		control: {
			disable: true,
		},
	},
};

export function noItems(): Component {
	return {
		components: { OptionsMenu },

		template: `
			<div>
				<OptionsMenu
					:menu-items="[]"
				>
                  <template v-slot:no-results>
                    <em>Nothing</em> was found! 😢
                  </template>
				</OptionsMenu>
			</div>
		`,
	};
}
