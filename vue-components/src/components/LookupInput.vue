<template>
	<div
		:class="[ 'wikit', 'wikit-LookupInput' ]"
		@keydown="triggerKeyDown"
	>
		<Input
			:value="searchInput"
			@input="onInput"
			@focus.native="onFocus"
			@blur.native="showMenu = false"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
			autocomplete="off"
			v-bind="$attrs"
			:aria-activedescendant="keyboardHoverId"
			:aria-owns="optionsMenuId"
			aria-autocomplete="list"
			aria-haspopup="listbox"
			:aria-expanded="showMenu || 'false'"
			:aria-required="ariaRequired ? 'true' : 'false'"
			role="combobox"
		/>
		<OptionsMenu
			class="wikit-LookupInput__menu"
			:menu-items="menuItems"
			:bold-labels="true"
			:selected-item-index="selectedItemIndex"
			v-show="showMenu"
			@select="onSelect"
			@scroll="onScroll"
			@esc="onEsc"
			@keyboard-hover-change="onKeyboardHoverChange"
			ref="menu"
			:id="optionsMenuId"
			:label="label"
		>
			<template v-slot:no-results>
				<slot name="no-results" />
			</template>
		</OptionsMenu>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Input from '@/components/Input.vue';
import OptionsMenu from '@/components/OptionsMenu.vue';
import isEqual from 'lodash.isequal';
import generateUid from '@/components/util/generateUid';
import VueCompositionAPI, { defineComponent, ref } from '@vue/composition-api';
import { MenuItem } from '@/components/MenuItem';

Vue.use( VueCompositionAPI );

export default defineComponent( {
	name: 'LookupInput',
	inheritAttrs: false,
	components: {
		Input,
		OptionsMenu,
	},
	setup() {
		const menu = ref<InstanceType<typeof OptionsMenu> | null>( null );

		function triggerKeyDown( event: KeyboardEvent ): void {
			menu.value?.onKeyDown( event );
		}

		return {
			triggerKeyDown,
			menu,
		};
	},
	data() {
		return {
			showMenu: false,
			scrollIndexStart: null as ( number | null ),
			scrollIndexEnd: null as ( number | null ),
			keyboardHoverId: null as ( string | null ),
			optionsMenuId: generateUid( 'wikit-OptionsMenu' ),
		};
	},
	props: {
		feedbackType: {
			type: String,
			validator( value: string | null ): boolean {
				return value === null || [ 'warning', 'error' ].includes( value );
			},
			default: null,
		},
		/**
		 * Array of objects that will be displayed in the lookup menu. Must contain a `label` and a `description` field.
		 */
		menuItems: {
			type: Array,
			default: (): [] => [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		ariaRequired: {
			type: Boolean,
			default: false,
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
		/**
		 * Sets the value of the Lookup component's inner `<input>` element. This prop can be used with the `.sync`
		 * modifier. When bound to a field in the consuming component's data object, it can be used within a watcher or
		 * computed property to dynamically update the Lookup's `menuItems` prop.
		 */
		searchInput: {
			type: String,
			default: '',
		},
		/**
		 * Sets the label to be passed down to the inner `<OptionsMenu>` component so it can be properly announced
		 * by screen readers.
		 */
		label: {
			type: String,
			default: '',
		},
	},
	methods: {
		canShowMenu( currentSearchInput: string ): boolean {
			return currentSearchInput.length > 0;
		},
		onInput( value: string ): void {
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
			this.showMenu = false;

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * This event is emitted whenever an item is selected on the Lookup. The event payload contains the whole
			 * MenuItem object. The payload is null when no item is selected or the item is deselected.
			 */
			this.$emit( 'input', menuItem );
			this.$emit( 'update:searchInput', menuItem.label );
		},
		onFocus(): void {
			if ( this.canShowMenu( this.searchInput ) ) {
				this.showMenu = true;
			}
		},
		onEsc(): void {
			this.showMenu = false;
			this.keyboardHoverId = null;
		},
		onScroll( firstIndex: number, lastIndex: number ): void {
			if ( firstIndex !== this.scrollIndexStart || lastIndex !== this.scrollIndexEnd ) {
				/**
				 * This event is emitted whenever the first or last index of the
				 * visible menuItems changes. If the user scrolls but the indexes remain
				 * unchanged the event won't fire.
				 *
				 */
				this.$emit( 'scroll', firstIndex, lastIndex );
				this.scrollIndexStart = firstIndex;
				this.scrollIndexEnd = lastIndex;
			}

		},
		onKeyboardHoverChange( menuItemId: string ): void {
			this.keyboardHoverId = menuItemId;
		},
	},
	computed: {
		selectedItemIndex(): number {
			if ( this.value === null || this.menuItems.length === 0 ) {
				return -1;
			}

			return this.menuItems.findIndex(
				( menuItem ) => {
					return isEqual( menuItem, this.value );
				},
				this,
			);
		},
	},
} );
</script>

<style lang="scss">
.wikit-LookupInput {
	position: relative;

	&__menu {
		position: absolute;
	}

}
</style>
