<template>
	<div :class="[ 'wikit', 'wikit-TextInput', extraClasses ]" :style="extraStyles">
		<span class="wikit-TextInput__label-wrapper">
			<label
				:class="[
					'wikit-TextInput__label',
					disabled ? `wikit-TextInput__label--disabled` : ''
				]"
				:for="id"
			>
				{{ label }}
			</label>
			<span><slot name="suffix" /></span>
		</span>
		<Input
			:id="id"
			:value="value"
			@input="emitInputEvent"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
			v-bind="otherAttributes"
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
import VueCompositionAPI, { defineComponent, computed } from '@vue/composition-api';
import ValidationMessage from './ValidationMessage.vue';
import Input from './Input.vue';
import generateUid from '@/components/util/generateUid';
import { errorProp, ErrorProp, getFeedbackTypeFromProps } from '@/compositions/validatable';

Vue.use( VueCompositionAPI );

/**
 * Text input fields are form elements that let users input and edit values in the form of text.
 *
 * Uses the following components internally: Input, ValidationMessage
 */
export default defineComponent( {
	name: 'TextInput',
	inheritAttrs: false,
	setup( props: { error: ErrorProp }, context ) {
		const { class: extraClasses, style: extraStyles, ...otherAttributes } = context.attrs;
		return {
			extraClasses,
			extraStyles,
			otherAttributes,
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
			id: generateUid( 'wikit-TextInput' ),
		};
	},

	methods: {
		emitInputEvent( value: string ): void {
			/**
			 * contains user input, i.e. the contents of the input value
			 */
			this.$emit( 'input', value );
		},
	},

	components: {
		Input,
		ValidationMessage,
	},
} );
</script>

<style lang="scss">
.wikit-TextInput {
	&__label-wrapper {
		display: flex;
		align-items: center;
		gap: $dimension-spacing-small;
	}

	&__label {
		@include Label( block );
	}
}
</style>
