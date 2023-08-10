<template>
	<div :class="[ 'wikit', 'wikit-ExtendedNumberInput' ]">
		<label
			:class="[
				'wikit',
				'wikit-ExtendedNumberInput__label',
				disabled ? `wikit-ExtendedNumberInput__label--disabled` : ''
			]"
			:for="id"
		>
			{{ label }}
		</label>
		<Input
			:id="id"
			:value="value"
			@input="emitInputEvent"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<ValidationMessage
			v-if="error"
			:type="error.type"
			:message="error.message"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { defineComponent, computed } from 'vue';
import ValidationMessage from './ValidationMessage.vue';
import Input from './Input.vue';
import generateUid from '@/components/util/generateUid';
import { errorProp, ErrorProp, getFeedbackTypeFromProps } from '@/compositions/validatable';
import validateExtendedNumberInput from '@/components/util/validateExtendedNumberInput';

/**
 * Number input fields are form elements that let users input and edit values in the form of number.
 * But it accepts more than just number, it also accepts margin of error, etc.
 *
 * Uses the following components internally: Input, ValidationMessage
 */
export default defineComponent( {
	name: 'ExtendedNumberInput',
	setup( props: { error: ErrorProp } ) {
		return {
			feedbackType: computed( getFeedbackTypeFromProps( props ) ),
		};
	},
	props: {
		error: errorProp,
		disabled: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			// https://github.com/vuejs/vue/issues/5886
			id: generateUid( 'wikit-ExtendedNumberInput' ),
		};
	},

	methods: {
		emitInputEvent( value: string ): void {
			/**
			 * contains user input, i.e. the contents of the input value
			 */
			this.$emit( 'input', value );
			if ( value && !validateExtendedNumberInput( value ) ) {
				this.$emit( 'invalid-input', value );
			}
		},
	},

	components: {
		Input,
		ValidationMessage,
	},
} );
</script>

<style lang="scss">
.wikit-ExtendedNumberInput {
	&__label {
		@include Label( block );
	}
}
</style>
