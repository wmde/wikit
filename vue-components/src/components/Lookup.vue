<template>
	<div
		:class="[ 'wikit', 'wikit-Lookup' ]"
	>
		<span class="wikit-Lookup__label-wrapper">
			<label class="wikit-Lookup__label" :for="inputId">{{ label }}</label>
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
			<template v-slot:no-results>
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
import Vue from 'vue';
import VueCompositionAPI, { defineComponent, computed, PropType } from '@vue/composition-api';
import ValidationMessage from './ValidationMessage.vue';
import generateUid from '@/components/util/generateUid';
import { MenuItem } from '@/components/MenuItem';
import { getFeedbackTypeFromProps, errorProp, ErrorProp } from '@/compositions/validatable';
import LookupInput from '@/components/LookupInput.vue';

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
		return {
			feedbackType: computed( getFeedbackTypeFromProps( props ) ),
		};
	},
	data() {
		return {
			inputId: generateUid( 'wikit-Lookup' ),
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
	components: {
		LookupInput,
		ValidationMessage,
	},
} );
</script>

<style lang="scss">
.wikit-Lookup {
	&__label-wrapper {
		display: flex;
		align-items: center;
		gap: $dimension-layout-xxsmall;
	}

	&__label {
		@include Label( block );
		display: inine;
	}
}
</style>
