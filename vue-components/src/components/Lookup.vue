<template>
	<div
		:class="[ 'wikit', 'wikit-Lookup' ]"
	>
		<span class="wikit-Lookup__label-wrapper">
			<label
				:class="[
					'wikit-Lookup__label',
					disabled ? `wikit-Lookup__label--disabled` : ''
				]"
				:for="inputId"
			>
				{{ label }}
			</label>
			<span><slot name="suffix" /></span>
		</span>

		<LookupInput
			:id="inputId"
			:feedback-type="feedbackType"
			:menu-items="menuItems"
			:disabled="disabled"
			:placeholder="placeholder"
			:value="value"
			:search-input="searchInput"
			@update:searchInput="$emit('update:searchInput', $event)"
			@input="$emit('input', $event)"
			@scroll="(firstIndex, lastIndex) => $emit('scroll', firstIndex, lastIndex)"
		>
			<template #no-results>
				<slot name="no-results" />
			</template>
		</LookupInput>
		<ValidationMessage
			v-if="error"
			:type="error.type"
			:message="error.message"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import ValidationMessage from './ValidationMessage.vue';
import generateUid from '@/components/util/generateUid';
import { MenuItem } from '@/components/MenuItem';
import { getFeedbackTypeFromProps, errorProp, ErrorProp } from '@/compositions/validatable';
import LookupInput from '@/components/LookupInput.vue';

/**
 * The lookup component is a text input field that provides matching selectable suggestions as a user types into it.
 * In the context of Wikidata, they can be used as Item and Property selectors, for example.
 *
 * Uses the following components internally: Input, ValidationMessage and OptionsMenu
 */
export default defineComponent( {
	name: 'Lookup',
	setup( props: { error: ErrorProp } ) {
		return {
			feedbackType: computed( getFeedbackTypeFromProps( props ) ),
		};
	},
	data() {
		return {
			inputId: generateUid( 'wikit-Lookup' ),
		};
	},
	emits: [
		/**
		 * This event is emitted whenever an item is selected on the Lookup. The event payload contains the whole
		 * MenuItem object. The payload is null when no item is selected or the item is deselected.
		 */
		'input',
		/**
		 * Enables the `searchInput` prop. It's used to transport the value of
		 * the Lookup component's inner `<input>` element to the parent component.
		 */
		'update:searchInput',
		/**
		 * This event is emitted whenever the first or last index of the
		 * visible menuItems changes. If the user scrolls but the indexes remain
		 * unchanged the event won't fire.
		 */
		'scroll',
	],
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
			type: Object as PropType<MenuItem | null>,
			default: null,
		},
		/**
		 * Sets the value of the Lookup component's inner `<input>` element. This prop can be used with v-model.
		 * When bound to a field in the consuming component's data object, it can be used within a watcher or
		 * computed property to dynamically update the Lookup's `menuItems` prop.
		 */
		searchInput: {
			type: String,
			default: '',
		},
	},
	components: {
		LookupInput,
		ValidationMessage,
	},

	compatConfig: {
		MODE: 3,
	},
} );
</script>

<style lang="scss">
.wikit-Lookup {
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
