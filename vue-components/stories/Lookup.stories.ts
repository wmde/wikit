import Lookup from '@/components/Lookup';
import { Component } from 'vue';
import { MenuItem } from '@/components/MenuItem';

export default {
	component: Lookup,
	title: '/Lookup/Lookup',
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

export function all(): Component {
	return {
		components: { Lookup },
		data() {
			return {
				search: '',
				selectedItem: null,
				visibleItems: null,
			};
		},
		computed: {
			menuItems(): MenuItem[] {
				return vegetableItems.filter( ( item ) => item.label.includes( this.search ) );
			},
		},
		methods: {
			onScroll( firstIndex, lastIndex ): void {
				this.visibleItems = { firstIndex, lastIndex };
			}
		},
		template: `
			<div>
				<div style="margin-bottom: 20px">
					<Lookup
						:search-input.sync="search"
						label="Label"
						v-model="selectedItem"
						:menu-items="menuItems"
						placeholder="placeholder"
						width="medium"
						@scroll="onScroll"
					>
						<template v-slot:no-results>
							No match was found
						</template>
					</Lookup>
					<div v-if="selectedItem" style="margin-top: 16px">
						Selected vegetable:
						<span class="selected-item-label">{{ selectedItem.label }}</span>
						(<span class="selected-item-id">{{ selectedItem.value }}</span>)
					</div>
					<div v-if="visibleItems" style="margin-top: 16px">
						Visible elements on scroll:
						<div class="first-visible-element-index">First index: {{ visibleItems.firstIndex }}</div>
						<div class="last-visible-element-index">Last index: {{ visibleItems.lastIndex }}</div>
					</div>
				</div>
				<div style="margin-bottom: 20px">
					<Lookup
					label="Label"
					:menu-items="[]"
					placeholder="placeholder"
					width="medium"
					:error= "{ type: 'warning', message: 'Warning message' }"
				/>
				</div>
				<div style="margin-bottom: 20px">
					<Lookup
					label="Label"
					:menu-items="[]"
					placeholder=""
					width="medium"
					:error= "{ type: 'error', message: 'Please make a valid selection' }"
				/>
				</div>
			</div>
		`,
	};
}
