import Lookup from '@/components/Lookup';
import Icon from '@/components/Icon';
import { MenuItem } from '@/components/MenuItem';
import { Component } from 'vue';

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

const addOnScroll = [
	{
		label: 'passionfruit',
		description: 'sour sweet tropical fruit',
		value: 'Q165449',
	},
	{
		label: 'jackfruit',
		description: 'edible fruit of the jack tree',
		value: 'Q16136843',
	},
	{
		label: 'sweet potato',
		description: 'a potato like root vegetable with a sweet taste',
		value: 'Q37937',
	},
];

export function all(): Component {
	return {
		components: { Lookup, Icon },
		data(): unknown {
			return {
				search: '',
				selectedItem: null,
				visibleItems: null,
				menuVegetableItems: vegetableItems,
			};
		},
		computed: {
			menuItems: {
				get(): MenuItem {
					return this.menuVegetableItems.filter( ( item ) => item.label.includes( this.search ) );
				},
				set( newMenuItems: MenuItem[] ): void {
					this.menuVegetableItems = newMenuItems;
				},
			},
		},
		methods: {
			onScroll( firstIndex: number, lastIndex: number ): void {
				this.visibleItems = { firstIndex, lastIndex };
				if ( lastIndex === this.menuItems.length - 1 ) {
					this.menuItems = [ ...vegetableItems, ...addOnScroll ];
				}
			},
		},
		template: `
			<div>
				<div style="margin-bottom: 20px">
					<Lookup
						:search-input.sync="search"
						label="Label"
						v-model="selectedItem"
						:menu-items="menuItems"
						placeholder="Placeholder"
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
					placeholder="Placeholder"
					:error= "{ type: 'warning', message: 'Warning message' }"
				/>
				</div>
				<div style="margin-bottom: 20px">
					<Lookup
					label="Label"
					:menu-items="[]"
					placeholder="Placeholder"
					:error= "{ type: 'error', message: 'Please make a valid selection' }"
				/>
				</div>
				<div style="margin-bottom: 20px" dir="ltr">
					<Lookup
						:search-input.sync="search"
						label="Label with suffix icon"
						v-model="selectedItem"
						:menu-items="menuItems"
						placeholder="Placeholder"
						@scroll="onScroll"
					>
						<template v-slot:suffix>
							<Icon type="info-outlined" size="medium" color="base"/>
						</template>
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
			</div>
		`,
	};
}
