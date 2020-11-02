<template>
	<div :class="[ 'wikit', 'wikit-TextInput' ]">
		<label class="wikit-TextInput__label" :for="id">{{ label }}</label>
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
import ValidationMessage from './ValidationMessage.vue';
import Input from './Input.vue';
import generateUid from '@/components/util/generateUid';

/**
 * Text input fields are form elements that let users input and edit values in the form of text.
 *
 * Uses the following components internally: Input, ValidationMessage
 */
export default Vue.extend( {
	name: 'TextInput',
	props: {
		error: {
			type: Object,
			validator( error: { type?: string; message?: string } ): boolean {
				return error === null ||
					typeof error.message === 'string' &&
					typeof error.type === 'string' &&
					[ 'warning', 'error' ].includes( error.type );
			},
			default: null,
		},
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
		}
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

	computed: {
		feedbackType(): string|null {
			return this.error && this.error.type || null;
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

	&__label {
		@include Label;
		display: block;
	}
}
</style>
