<template>
	<div
		:class="[ 'wikit', 'wikit-InputWithExtender' ]"
	>
		<span class="wikit-InputWithExtender__label-wrapper">
			<label class="wikit-InputWithExtender__label" @click="$refs.select.focus()">{{ label }}</label>
			<span><slot name="suffix" /></span>
		</span>
		<Input
			:id="id"
			:value="value"
			@focus.native="showExtension = true"
			@blur.native="showExtension = false"
			@keydown.native.esc="showExtension = false"
			:feedback-type="feedbackType"
			@input="onInput"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<div v-if="showExtension" class="wikit-InputWithExtender__extension wikit-InputWithExtender__content-placeholder">
			<slot />
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
import VueCompositionAPI, { computed, defineComponent } from '@vue/composition-api';
import Input from '@/components/Input.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import { ErrorProp, errorProp, getFeedbackTypeFromProps } from '@/compositions/validatable';
import generateUid from '@/components/util/generateUid';

Vue.use( VueCompositionAPI );

export default defineComponent( {
	name: 'InputWithExtender',
	inheritAttrs: false,
	components: {
		Input,
		ValidationMessage,
	},
	setup( props: { error: ErrorProp } ) {
		return {
			feedbackType: computed( getFeedbackTypeFromProps( props ) ),
		};
	},
	data() {
		return {
			showExtension: false,
			id: generateUid( 'wikit-InputWithExtender' ),
		};
	},
	props: {
		error: errorProp,
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: null,
		},
		label: {
			type: String,
			default: null,
		},
	},
	methods: {
		onInput( value: string ): void {
			this.showExtension = true;
			this.$emit( 'input', value );
		},
	},
} );
</script>

<style lang="scss">
.wikit-InputWithExtender {
	position: relative;

	&__label-wrapper {
		display: flex;
		align-items: center;
		gap: $dimension-spacing-small;
	}

	&__extension {
		padding-inline: $wikit-InputExtender-padding-horizontal;
		padding-block: $wikit-InputExtender-padding-vertical;
		background: $wikit-InputExtender-background-color;
		min-width: $wikit-InputExtender-min-width;
		max-width: $wikit-InputExtender-max-width;
		position: absolute;
		overflow-y: auto;
		z-index: 1;

		border: $wikit-InputExtender-border-width $wikit-InputExtender-border-style $wikit-InputExtender-border-color;
		box-shadow: $wikit-InputExtender-box-shadow;
		border-radius: $wikit-InputExtender-border-radius;
	}

	&__content-placeholder {
		font-family: $wikit-InputExtender-content-placeholder-font-family;
		font-size: $wikit-InputExtender-content-placeholder-font-size;
		font-weight: $wikit-InputExtender-content-placeholder-font-weight;
		line-height: $wikit-InputExtender-content-placeholder-line-height;
		color: $wikit-InputExtender-content-placeholder-color;
	}

}
</style>

<style lang="scss">
.wikit-InputWithExtender {
	&__label {
		@include Label( block );
	}
}
</style>
