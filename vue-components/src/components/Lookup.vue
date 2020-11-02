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
		/>
		<LookupMenu
			class="wikit-Lookup__menu"
			:menu-items="menuItems"
			v-if="showsMenu"
			@select="onSelect"
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
			inputId: generateUid( 'wikit-Lookup' ),
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
		 *
		 * The data usually comes from the consumer's `v-model` annotation on the Lookup component.
		 * Currently this prop is not used and does nothing.
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
		onInput( value: string ): void {
			this.hasItemSelected = false;

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * Enables the `searchInput` prop to be used with the `.sync` modifier. It's used to transport the value of
			 * the Lookup component's inner `<input>` element to the parent component.
			 */
			this.$emit( 'update:searchInput', value );
		},

		onSelect( menuItem: MenuItem ): void {
			this.hasItemSelected = true;

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * This even is emitted whenever an item is selected on the Lookup. The event payload contains the whole
			 * MenuItem object.
			 */
			this.$emit( 'input', menuItem );
			this.$emit( 'update:searchInput', menuItem.label );

			// We know that there is one input here because it is part of this component
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.$el.querySelector( 'input' )!.blur();
		},
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

	&__menu {
		position: absolute;
	}

	&__label {
		@include Label;
		display: block;
	}
}
</style>
