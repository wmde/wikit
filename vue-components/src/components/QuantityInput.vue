<template>
	<div class="wikit wikit-QuantityInput">
		<span class="wikit-QuantityInput__label-wrapper">
			<label class="wikit-QuantityInput__label" :for="id">{{ label }}</label>
			<span><slot name="suffix" /></span>
		</span>
		<div class="wikit-QuantityInput__input-wrapper">
			<Input
				class="wikit-QuantityInput__number-input"
				:placeholder="numberInputPlaceholder"
				:value="numberInputValue"
				:id="id"
				@input="onNumberInput"
				:disabled="disabled"
				:feedback-type="errorCause === 'number' || errorCause === 'both' ? feedbackType : null"
			/>
			<LookupInput
				class="wikit-QuantityInput__unit-lookup"
				:aria-label="unitLookupLabel"
				:placeholder="unitLookupPlaceholder"
				:disabled="disabled"
				:menu-items="unitLookupMenuItems"
				@update:searchInput="onUnitLookupSearchInput"
				:search-input="unitLookupSearchInput"
				@input="onUnitLookupValue"
				:value="unitLookupValue"
				:feedback-type="errorCause === 'unit' || errorCause === 'both' ? feedbackType : null"
			>
				<template v-slot:no-results>
					<slot name="no-results" />
				</template>
			</LookupInput>
		</div>
		<ValidationMessage
			v-if="error"
			:type="error.type"
			:message="error.message"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent, computed, PropType } from '@vue/composition-api';
import Input from '@/components/Input.vue';
import LookupInput from '@/components/LookupInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import generateUid from '@/components/util/generateUid';
import { ErrorProp, errorProp, getFeedbackTypeFromProps } from '@/compositions/validatable';
import { MenuItem } from '@/components/MenuItem';

Vue.use( VueCompositionAPI );

export default defineComponent( {
	props: {
		error: errorProp,
		/**
		 * Use this prop to define the cause of the error
		 */
		errorCause: {
			type: String as PropType<'number' | 'unit' | 'both' | null>,
			default: null,
			validator: ( prop: string | null ): boolean => {
				return [ 'number', 'unit', 'both', null ].includes( prop );
			},
		},
		/**
		 * visual label for the entire component, linked to the number input
		 */
		label: {
			type: String,
			required: true,
		},
		/**
		 * not visible, only accessible for screen readers
		 */
		unitLookupLabel: {
			type: String,
			required: true,
		},
		/**
		 * Placeholder for the number Input
		 */
		numberInputPlaceholder: {
			type: String,
			required: true,
		},
		/**
		 * This is the plain value in the number input. Note that it is a string
		 */
		numberInputValue: {
			type: String,
			default: null,
		},
		/**
		 * Placeholder for the unit Lookup
		 */
		unitLookupPlaceholder: {
			type: String,
			required: true,
		},
		/**
		 * MenuItems for the unit Lookup
		 */
		unitLookupMenuItems: {
			type: Array as PropType<MenuItem[]>,
			required: true,
		},
		/**
		 * Analogous to the `searchInput` prop on the Lookup component. Can be used with the .sync modifier
		 */
		unitLookupSearchInput: {
			type: String,
			required: true,
		},
		/**
		 * Analogous to the `value` prop on the Lookup component.
		 * The selected menu item, can be of type `MenuItem` or `null`.
		 *
		 * Can be used with the .sync modifier.
		 */
		unitLookupValue: {
			type: Object as PropType<MenuItem | null>,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup( props: { error: ErrorProp } ) {
		return {
			feedbackType: computed( getFeedbackTypeFromProps( props ) ),
		};
	},
	data() {
		return {
			// https://github.com/vuejs/vue/issues/5886
			id: generateUid( 'wikit-Input' ),
		};
	},
	methods: {
		onNumberInput( number: number ): void {
			/**
			 * The plain text in the number input as string
			 */
			this.$emit( 'update:numberInputValue', number );
		},
		onUnitLookupSearchInput( search: string ): void {
			/**
			 * The search text for the unit Lookup
			 */
			this.$emit( 'update:unitLookupSearchInput', search );
		},
		onUnitLookupValue( value: null | MenuItem ): void {
			/**
			 * The selected menu item for the unit Lookup
			 */
			this.$emit( 'update:unitLookupValue', value );
		},
	},
	name: 'QuantityInput',
	components: {
		Input,
		LookupInput,
		ValidationMessage,
	},
} );
</script>

<style lang="scss">
.wikit-QuantityInput {
	&__input-wrapper {
		display: flex;
		align-items: baseline;
	}

	&__number-input {
		flex: 1 1 50%;

		&.wikit-Input {
			border-start-end-radius: 0;
			border-end-end-radius: 0;
		}
	}

	&__unit-lookup {
		flex: 1 1 50%;

		.wikit-Input {
			border-start-start-radius: 0;
			border-end-start-radius: 0;
		}
	}

	&__label-wrapper {
		display: flex;
		gap: $dimension-layout-xxsmall;
	}

	&__label {
		@include Label(block);
	}
}
</style>
