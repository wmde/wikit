<template>
	<div class="wikit wikit-QuantityInput">
		<label class="wikit-QuantityInput__label" :for="id">{{ label }}</label>
		<div class="wikit-QuantityInput__input-wrapper">
			<Input
				class="wikit-QuantityInput__number-input"
				:placeholder="numberInputPlaceholder"
				:value="numberInputValue"
				:id="id"
				@input="onNumberInput"
				:disabled="disabled"
				:feedback-type="feedbackType"
			/>
			<LookupInput
				class="wikit-QuantityInput__unit-lookup"
				:label="unitLookupLabel"
				:placeholder="unitLookupPlaceholder"
				:disabled="disabled"
				:menu-items="unitLookupMenuItems"
				@update:searchInput="onUnitLookupSearchInput"
				:search-input="unitLookupSearchInput"
				@input="onUnitLookupValue"
				:value="unitLookupValue"
				:feedback-type="feedbackType"
			/>
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
		 * FIXME: document
		 */
		numberInputValue: {
			type: String, // FIXME: decide if this actually should be a string?
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
		 * FIXME: document
		 */
		unitLookupSearchInput: {
			type: String,
			required: true,
		},
		/**
		 * FIXME: document
		 */
		unitLookupValue: {
			type: Object,
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
			// FIXME: document
			this.$emit( 'update:numberInputValue', number );
		},
		onUnitLookupSearchInput( search: string ): void {
			// FIXME: document
			this.$emit( 'update:unitLookupSearchInput', search );
		},
		onUnitLookupValue( value: null | MenuItem ): void {
			// FIXME: document
			this.$emit( 'update:unitLookupValue', value );
		},
	},
	name: 'QuantityInput',
	components: {
		Input, // TODO: add validation
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

			&:not(.wikit-Input--error) {
				border-inline-end-color: transparent;
			}
		}
	}

	&__unit-lookup {
		flex: 1 1 50%;

		.wikit-Input {
			border-start-start-radius: 0;
			border-end-start-radius: 0;
		}

		.wikit-Lookup__label {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			clip-path: inset(50%);
			border: 0;
		}
	}

	&__label {
		@include Label(block);
	}
}
</style>
