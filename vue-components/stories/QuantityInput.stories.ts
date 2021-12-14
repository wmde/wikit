import QuantityInput from '@/components/QuantityInput';
import { Component } from 'vue';
import { MenuItem } from '../src/components/MenuItem';
import validateExtendedNumberInput from '@/components/util/validateExtendedNumberInput';

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

export function basic( args: object ): Component {
	return {
		components: { QuantityInput },
		props: Object.keys( args ),
		data(): unknown {
			return {
				search: '',
				selectedUnit: null,
				enteredNumber: null,
				errorCause: null,
			};
		},
		computed: {
			menuItems(): MenuItem[] {
				return vegetableItems.filter( ( item ) => item.label.includes( this.search ) );
			},
			error(): { type: string; message: string } | null {
				if ( !this.enteredNumber ) {
					return null;
				}
				if ( validateExtendedNumberInput( this.enteredNumber ) ) {
					return null;
				}
				return { type: 'error', message: 'Please enter a valid number.' };
			},
		},
		template: `
			<div dir="ltr">
				<p>
					<QuantityInput
						:label="label"
						:numberInputPlaceholder="numberInputPlaceholder"
						:number-input-value.sync="enteredNumber"
						:unit-lookup-label="unitLookupLabel"
						:unitLookupPlaceholder="unitLookupPlaceholder"
						:unit-lookup-menu-items="menuItems"
						:unit-lookup-search-input.sync="search"
						:unit-lookup-value.sync="selectedUnit"
						:disabled="disabled"
						:errorCause="error ? 'number' : null"
						:error="error"
					>
						<template v-slot:no-results>
							No match was found
						</template>
					</QuantityInput>
				</p>
				<p style="margin-top: 16px; font-family: sans-serif; color: #202122">
				Number entered: {{ enteredNumber }}
			</p>
			<p style="margin-top: 16px; font-family: sans-serif; color: #202122">
				Selected Unit:
				<span v-if="selectedUnit">
				<span class="selected-item-label">{{ selectedUnit.label }}</span>
				(<span class="selected-item-id">{{ selectedUnit.value }}</span>)
					</span>
			</p>
			</div>
		`,
	};
}

basic.args = {
	label: 'Value and Unit (optional)',
	numberInputPlaceholder: 'Enter a number',
	unitLookupLabel: 'Unit (optional)',
	unitLookupPlaceholder: 'Enter a unit',
	disabled: false,
};

basic.argTypes = {
	error: { control: 'disabled' },
	errorCause: { control: 'disabled' },
	numberInputValue: { control: 'disabled' },
	unitLookupMenuItems: { control: 'disabled' },
	unitLookupSearchInput: { control: 'disabled' },
	unitLookupValue: { control: 'disabled' },
};

export function all(): Component {
	return {
		components: { QuantityInput },
		template: `
			<div dir="ltr">
				<p>
					<QuantityInput
						label="Value and Unit (optional)"
						numberInputPlaceholder="Enter a number"
						unit-lookup-label="Unit (optional)"
						unitLookupPlaceholder="Enter a unit"
						:unit-lookup-menu-items="[]"
					 	unit-lookup-search-input=""
						:error="{type: 'error', message: 'Please enter a value'}"
						errorCause="number"
					/>
				</p>
				<p>
					<QuantityInput
						label="Value and Unit (optional)"
						numberInputPlaceholder="Enter a number"
						unit-lookup-label="Unit (optional)"
						unitLookupPlaceholder="Enter a unit"
						:unit-lookup-menu-items="[]"
						unit-lookup-search-input=""
						:error="{type: 'error', message: 'Select a valid unit or leave empty'}"
						errorCause="unit"
					>
						<template v-slot:suffix>
							ℹ
						</template>
					</QuantityInput>
				</p>
				<p>
					<QuantityInput
						label="Value and Unit (optional)"
						numberInputPlaceholder="Enter a number"
						unit-lookup-label="Unit (optional)"
						unitLookupPlaceholder="Enter a unit"
						:unit-lookup-menu-items="[]"
						unit-lookup-search-input=""
						:error="{type: 'error', message: 'Enter a value and select a valid unit'}"
						errorCause="both"
					/>
				</p>
			</div>
		`,
	};
}

all.parameters = {
	controls: { hideNoControlsWarning: true },
};
