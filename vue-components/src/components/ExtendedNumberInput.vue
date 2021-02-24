<template>
	<div :class="[ 'wikit', 'wikit-ExtendedNumberInput' ]">
		<label class="wikit-ExtendedNumberInput__label" :for="id">{{ label }}</label>
		<Input
			:id="id"
			v-model="textValue"
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
import VueCompositionAPI, { defineComponent, computed, PropType } from '@vue/composition-api';
import ValidationMessage from './ValidationMessage.vue';
import Input from './Input.vue';
import generateUid from '@/components/util/generateUid';
import { errorProp, ErrorProp, getFeedbackTypeFromProps } from '@/compositions/validatable';
import {
	parseExtendedNumber,
	PreciseNumber,
	validateExtendedNumberInput,
} from '@/components/util/validateExtendedNumberInput';

Vue.use( VueCompositionAPI );

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
			type: Object as PropType<PreciseNumber | null>,
			default: null,
		},
	},
	data() {
		return {
			// https://github.com/vuejs/vue/issues/5886
			id: generateUid( 'wikit-ExtendedNumberInput' ),
			textValue: '',
		};
	},

	methods: {
		emitInputEvent( input: string ): void {
			if ( !validateExtendedNumberInput( input ) ) {
				this.$emit( 'input', null );
				/**
				 * Is emitted when the user types invalid or empty input and contains the input string
				 */
				this.$emit( 'invalid-input', input );
				return;
			}

			/**
			 * emits an object containing the user input,
			 *
			 * * if the user input is valid, it will be parsed into the key `number`
			 * * if the user gave some precision, that be in the key `precision`, otherwise it will be `null`
			 * * if the user input is invalid or empty, `null` will be emitted
			 */
			this.$emit( 'input', parseExtendedNumber( input ) );
		},
		setTextValueFromNumbers( value: PreciseNumber ): void {
			this.textValue = `${value.number}`;
			if ( value.precision !== null ) {
				this.textValue += `+-${value.precision}`;
			}
		},
	},
	watch: {
		value( newValue: PreciseNumber | null ): void {
			if ( newValue === null ) {
				return;
			}
			if ( !validateExtendedNumberInput( this.textValue ) ) {
				this.setTextValueFromNumbers( newValue );
				return;
			}
			const parsedTextValue = parseExtendedNumber( this.textValue );
			if ( parsedTextValue.number !== newValue.number || parsedTextValue.precision !== newValue.precision ) {
				this.setTextValueFromNumbers( newValue );
			}
		},
	},
	mounted() {
		if ( this.value === null ) {
			return;
		}

		this.setTextValueFromNumbers( this.value );
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
