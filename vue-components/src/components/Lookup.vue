<template>
	<div :class="[ 'wikit', 'wikit-Lookup', `wikit-Lookup--${width}` ]">
		<label class="wikit-Lookup__label" :for="inputId">{{ label }}</label>
		<Input
			:id="inputId"
			:value="searchInput"
			@input="onInput"
			@focus.native="onFocus"
			@blur.native="showMenu = false"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
			@keydown.up.native.prevent="onArrowUp"
			@keydown.down.native.prevent="onArrowDown"
			@keyup.enter.native="onEnter"
			@keydown.tab.native="onTab"
			@keydown.enter.native.prevent="hasActiveElement = true"
			@keyup.esc.native="onEsc"
			autocomplete="off"
			ref="input"
		/>
		<LookupMenu
			class="wikit-Lookup__menu"
			:menu-items="menuItems"
			v-if="showMenu"
			@select="onSelect"
			:selected-item-index="selectedItemIndex"
			:has-active-element="hasActiveElement"
		>
			<template v-slot:no-results>
				<slot name="no-results" />
			</template>
		</LookupMenu>
		<ValidationMessage
			v-if="error"
			:type="error.type"
			:message="error.message"
		/>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import isEqual from 'lodash.isequal';
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
			showMenu: false,
			enterKeyPressed: true,
			inputId: generateUid( 'wikit-Lookup' ),
			selectedItemIndex: -1,
			hasActiveElement: false,
		};
	},
	props: {
		/**
		 * Array of objects that will be displayed in the lookup menu. Must contain a `label` and a `description` field.
		 */
		menuItems: {
			type: Array as PropType<MenuItem[]>,
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
		 *
		 * The data usually comes from the consumer's `v-model` annotation on the Lookup component.
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
		canShowMenu( currentSearchInput: string ): boolean {
			return currentSearchInput.length > 0;
		},
		onInput( value: string ): void {
			this.enterKeyPressed = false;
			this.selectedItemIndex = -1;
			this.showMenu = this.canShowMenu( value );

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * Enables the `searchInput` prop to be used with the `.sync` modifier. It's used to transport the value of
			 * the Lookup component's inner `<input>` element to the parent component.
			 */
			this.$emit( 'update:searchInput', value );
			this.$emit( 'input', null );
		},

		onSelect( menuItem: MenuItem ): void {
			this.hasActiveElement = true;
			this.selectedItemIndex = -1;
			this.showMenu = false;

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * This event is emitted whenever an item is selected on the Lookup. The event payload contains the whole
			 * MenuItem object. The payload is null when no item is selected or the item is deselected.
			 */
			this.$emit( 'input', menuItem );
			this.$emit( 'update:searchInput', menuItem.label );

			// If a menu item is selected using the enter key, keep focus on input component
			if ( !this.enterKeyPressed ) {
				( ( this.$refs.input as Vue ).$el as HTMLElement ).blur();
			}
		},

		onEnter(): void {
			if ( this.selectedItemIndex !== -1 ) {
				this.enterKeyPressed = true;
				this.onSelect( this.menuItems[ this.selectedItemIndex ] );
			}
		},

		onArrowUp(): void {
			this.selectedItemIndex = Math.max( 0, this.selectedItemIndex - 1 );
		},
		onArrowDown(): void {
			this.selectedItemIndex = Math.min( this.menuItems.length - 1, this.selectedItemIndex + 1 );
		},
		onTab(): void {
			if ( this.selectedItemIndex !== -1 ) {
				this.onSelect( this.menuItems[ this.selectedItemIndex ] );
			}
		},
		onFocus(): void {
			this.enterKeyPressed = false;
			if ( this.canShowMenu( this.searchInput ) ) {
				this.showMenu = true;
			}

			if ( this.value !== null && this.menuItems.length > 0 ) {
				this.selectedItemIndex = this.menuItems.findIndex(
					( menuItem ) => { return isEqual( menuItem, this.value ); },
					this,
				);
			}
		},
		onEsc(): void {
			this.showMenu = false;
			this.selectedItemIndex = -1;
		},
	},

	computed: {
		feedbackType(): string | null {
			return this.error && this.error.type || null;
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
