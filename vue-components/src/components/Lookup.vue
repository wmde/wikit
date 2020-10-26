<template>
	<div :class="[ 'wikit', 'wikit-Lookup', `wikit-Lookup--${width}` ]">
		<label class="wikit-Lookup__label" :for="inputId">{{ label }}</label>
		<Input
			:id="inputId"
			:value="searchInput"
			@input="onInput"
			@focus.native="focused = true"
			@blur.native="focused = false"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
			@keyup.up.native="onArrowUp"
			@keyup.down.native="onArrowDown"
			@keydown.up.native.prevent
			@keydown.down.native.prevent
			@keyup.enter.native="onSelect( menuItems[ selectedItemIndex ] )"
			@keydown.tab.native.prevent="hasActiveElement = true"
			@keydown.enter.native.prevent="hasActiveElement = true"
			@keyup.tab.native="onTab"
			@keyup.esc.native="escKeyPressed = true"
		/>
		<LookupMenu
			class="wikit-Lookup__menu"
			:menu-items="menuItems"
			v-if="showsMenu && !escKeyPressed"
			@select="onSelect"
			:selected-item-index="selectedItemIndex"
			:has-active-element="hasActiveElement"
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
import { MenuItem } from '@/components/MenuItem';

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
			escKeyPressed: false,
			inputId: generateUid( 'wikit-Lookup' ),
			selectedItemIndex: null,
			hasActiveElement: false,
		};
	},
	props: {
		/**
		 * Array of objects that will be displayed in the lookup menu. Must contain a `label` and a `description` field.
		 */
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
		/**
		 * The selected menu item, can be of type `MenuItem` or `null`.
		 */
		value: {
			type: Object,
			default: null,
		},
		width: {
			type: String,
			validator( value: string ): boolean {
				return [ 'small', 'medium', 'large', 'full-width' ].includes( value );
			},
			default: 'medium',
		},
		/**
		 * Sets the value of the Lookup component's inner `<input>` element. This prop can be used with the `.sync`
		 * modifier. When bound to a field in the consuming component's data object, it can be used within a watcher or
		 * computed property to dynamically update the Lookup's `menuItems` prop.
		 */
		searchInput: {
			type: String,
			default: '',
		},
	},

	methods: {
		onInput( value: string ): void {
			this.escKeyPressed = false;
			this.hasItemSelected = false;
			this.selectedItemIndex = null;
			this.hasActiveElement = false;

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * Enables the `searchInput` prop to be used with the `.sync` modifier. It's used to transport the value of
			 * the Lookup component's inner `<input>` element to the parent component.
			 */
			this.$emit( 'update:searchInput', value );
		},

		onSelect( menuItem: MenuItem ): void {
			this.selectedItemIndex = null;
			this.hasItemSelected = true;
			this.hasActiveElement = false;

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * This even is emitted whenever an item is selected on the Lookup. The event payload contains the whole
			 * MenuItem object.
			 */
			this.$emit( 'input', menuItem );
			this.$el.querySelector( 'input' ).blur();
			this.$emit( 'update:searchInput', menuItem.label );
		},

		onArrowUp() {
			this.selectedItemIndex = Math.max( 0, this.selectedItemIndex - 1 );
		},
		onArrowDown() {
			const index = this.selectedItemIndex === null ? -1 : this.selectedItemIndex;
			this.selectedItemIndex = Math.min( this.menuItems.length - 1, index + 1 );
		},
		onTab() {
			if ( this.selectedItemIndex !== null ) {
				this.onSelect( this.menuItems[ this.selectedItemIndex ] );
			}
		},
		onEsc(): boolean {
			return false;
			// this.showsMenu = false;
			// this.hasItemSelected = false;
			// this.selectedItemIndex = null;
			// this.hasActiveElement = false;
		}
	},

	computed: {
		feedbackType(): string | null {
			return this.error && this.error.type || null;
		},

		showsMenu(): boolean {
			return !this.hasItemSelected && this.focused && this.searchInput.length > 0;
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
