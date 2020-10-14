<template>
	<div :class="[ 'wikit', 'wikit-Lookup', `wikit-Lookup--${width}` ]">
		<label class="wikit-Lookup__label" :for="inputId">{{ label }}</label>
		<Input
			:id="inputId"
			v-model="inputValue"
			@input="hasItemSelected = false"
			@focus.native="focused = true"
			@blur.native="focused = false"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<LookupMenu
			class="wikit-Lookup__menu"
			:menu-items="menuItems"
			v-if="showsMenu"
			@selected="hasItemSelected = true"
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
import LookupMenu from './LookupMenu.vue';
import generateUid from '@/components/util/generateUid';

/**
 * The lookup component is a text input field that provides matching selectable suggestions as a user types into it.
 * In the context of Wikidata, they can be used as Item and Property selectors, for example.
 *
 * Uses the following components internally: Input, ValidationMessage and LookupMenu
 */
export default Vue.extend( {
	name: 'Lookup',
	data() {
		return {
			hasItemSelected: false,
			focused: false,
			inputValue: '',
			inputId: generateUid( 'wikit-Lookup' ),
		};
	},
	props: {
		menuItems: {
			type: Array,
			default: (): [] => [],
		},
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
		},
		width: {
			type: String,
			validator( value: string ): boolean {
				return [ 'small', 'medium', 'large', 'full-width' ].includes( value );
			},
			default: 'medium',
		},
	},

	computed: {
		feedbackType(): string | null {
			return this.error && this.error.type || null;
		},

		showsMenu(): boolean {
			return !this.hasItemSelected && this.focused && this.inputValue.length > 0;
		},
	},

	components: {
		Input,
		ValidationMessage,
		LookupMenu,
	},
} );
</script>

<style lang="scss">
.wikit-Lookup {
	position: relative;

	&--small {
		width: $wikit-Lookup-small-width;
	}

	&--medium {
		width: $wikit-Lookup-medium-width;
	}

	&--large {
		width: $wikit-Lookup-large-width;
	}

	&--full-width {
		width: $wikit-Lookup-full-width;
	}

	&__menu {
		position: absolute;
	}

	&__label {
		@include Label;
		display: block;
	}
}
</style>
