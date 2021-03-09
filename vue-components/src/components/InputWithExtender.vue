<template>
	<div
		:class="[ 'wikit', 'wikit-InputWithExtender' ]"
	>
		<TextInput
			:value="value"
			@input="onInput"
			:label="label"
			@focus="showExtension = true"
			@blur="showExtension = false"
			@esc="showExtension = false"
			:error="error"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<div v-if="showExtension" class="wikit-InputWithExtender__extension">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent } from '@vue/composition-api';
import TextInput from '@/components/TextInput.vue';
import { errorProp } from '@/compositions/validatable';

Vue.use( VueCompositionAPI );

export default defineComponent( {
	name: 'InputWithExtender',
	inheritAttrs: false,
	components: {
		TextInput,
	},
	data() {
		return {
			showExtension: false,
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

}
</style>
