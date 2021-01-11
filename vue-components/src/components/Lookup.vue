<template>
	<div
		:class="[ 'wikit', 'wikit-Lookup' ]"
		@keydown="triggerKeyDown"
	>
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
			autocomplete="off"
		/>
		<OptionsMenu
			class="wikit-Lookup__menu"
			:menu-items="menuItems"
			:bold-labels="true"
			:selected-item-index="selectedItemIndex"
			v-show="showMenu"
			@select="onSelect"
			@scroll="onScroll"
			@esc="onEsc"
			ref="menu"
		>
			<template v-slot:no-results>
				<slot name="no-results" />
			</template>
		</OptionsMenu>
		<ValidationMessage
			v-if="error"
			:type="error.type"
			:message="error.message"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent, computed, PropType, ref } from '@vue/composition-api';
import isEqual from 'lodash.isequal';
import ValidationMessage from './ValidationMessage.vue';
import Input from './Input.vue';
import OptionsMenu from './OptionsMenu.vue';
import generateUid from '@/components/util/generateUid';
import { MenuItem } from '@/components/MenuItem';
import { getFeedbackTypeFromProps, errorProp, ErrorProp } from '@/compositions/validatable';

Vue.use( VueCompositionAPI );

/**
 * The lookup component is a text input field that provides matching selectable suggestions as a user types into it.
 * In the context of Wikidata, they can be used as Item and Property selectors, for example.
 *
 * Uses the following components internally: Input, ValidationMessage and OptionsMenu
 */
export default defineComponent( {
	name: 'Lookup',
	setup( props: { error: ErrorProp } ) {
		const menu = ref<InstanceType<typeof OptionsMenu>|null>( null );

		function triggerKeyDown( event: KeyboardEvent ): void {
			menu.value?.onKeyDown( event );
		}

		return {
			feedbackType: computed( getFeedbackTypeFromProps( props ) ),
			triggerKeyDown,
			menu,
		};
	},
	data() {
		return {
			showMenu: false,
			inputId: generateUid( 'wikit-Lookup' ),
			scrollIndexStart: null as ( number | null ),
			scrollIndexEnd: null as ( number | null ),
		};
	},
	props: {
		error: errorProp,
		/**
		 * Array of objects that will be displayed in the lookup menu. Must contain a `label` and a `description` field.
		 */
		menuItems: {
			type: Array as PropType<MenuItem[]>,
			default: (): [] => [],
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
	},

	computed: {
		selectedItemIndex(): number {
			if ( this.value === null || this.menuItems.length === 0 ) {
				return -1;
			}

			return this.menuItems.findIndex(
				( menuItem ) => { return isEqual( menuItem, this.value ); },
				this,
			);
		},
	},

	components: {
		Input,
		ValidationMessage,
		OptionsMenu,
	},
} );
</script>

<style lang="scss">
.wikit-Lookup {
	position: relative;

	&__menu {
		position: absolute;
	}

	&__label {
		@include BlockLabel;
	}
}
</style>
