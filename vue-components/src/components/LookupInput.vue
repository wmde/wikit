<template>
	<div
		:class="[ 'wikit', 'wikit-LookupInput' ]"
		@keydown="triggerKeyDown"
	>
		<Input
			:value="searchInput"
			@input="onInput"
			@focus="onFocus"
			@blur="showMenu = false"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
			autocomplete="off"
			v-bind="$attrs"
			:aria-activedescendant="keyboardHoverId"
			:aria-controls="optionsMenuId"
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
			<template #no-results>
				<slot name="no-results" />
			</template>
		</OptionsMenu>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import isEqual from 'lodash.isequal';
import OptionsMenu from '@/components/OptionsMenu.vue';
import Input from '@/components/Input.vue';
import { MenuItem } from '@/components/MenuItem';

interface Props {
	feedbackType?: 'warning' | 'error' | null;
	/**
	 * Array of objects that will be displayed in the lookup menu. Must contain a `label` and a `description` field.
	 */
	menuItems?: MenuItem[];
	disabled?: boolean;
	ariaRequired?: boolean;
	placeholder?: string;
	/**
	 * The selected menu item
	 *
	 * The data usually comes from the consumer's `v-model` annotation on the Lookup component.
	 */
	value?: MenuItem | null;
	/**
	 * Sets the value of the Lookup component's inner `<input>` element. This prop can be used with v-model.
	 * When bound to a field in the consuming component's data object, it can be used within a watcher or
	 * computed property to dynamically update the Lookup's `menuItems` prop.
	 */
	searchInput?: string;
	/**
	 * Sets the label to be passed down to the inner `<OptionsMenu>` component so it can be properly announced
	 * by screen readers.
	 */
	label?: string;
}

const props = withDefaults( defineProps<Props>(), {
	feedbackType: null,
	menuItems: (): [] => [],
	disabled: false,
	ariaRequired: false,
	placeholder: '',
	value: null,
	searchInput: '',
	label: '',
} );

/**
 * Events are documented in the Lookup component
 */
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
	( e: 'scroll', firstIndex: number, lastIndex: number ): void;
	( e: 'input', value: MenuItem | null ): void;
	( e: 'update:searchInput', value: string ): void;
}>();

const menu = ref<InstanceType<typeof OptionsMenu> | null>( null );
const showMenu = ref( false );

function triggerKeyDown( event: KeyboardEvent ): void {
	if ( showMenu.value ) {
		menu.value?.onKeyDown( event );
	}
}

function canShowMenu( currentSearchInput: string ): boolean {
	return currentSearchInput.length > 0;
}

function onFocus(): void {
	if ( canShowMenu( props.searchInput ) ) {
		showMenu.value = true;
	}
}

function onInput( value: string ): void {
	showMenu.value = canShowMenu( value );

	emit( 'update:searchInput', value );
	emit( 'input', null );
}

function onSelect( menuItem: MenuItem ): void {
	showMenu.value = false;

	emit( 'input', menuItem );
	emit( 'update:searchInput', menuItem.label );
}

const keyboardHoverId = ref<string|null>( null );
function onEsc(): void {
	showMenu.value = false;
	keyboardHoverId.value = null;
}

function onKeyboardHoverChange( menuItemId: string ): void {
	keyboardHoverId.value = menuItemId;
}

const selectedItemIndex = computed( (): number => {
	if ( props.value === null || props.menuItems.length === 0 ) {
		return -1;
	}

	return props.menuItems.findIndex(
		( menuItem ) => {
			return isEqual( menuItem, props.value );
		},
		this,
	);
} );

</script>

<script lang="ts">
import { defineComponent } from 'vue';
import generateUid from '@/components/util/generateUid';

export default defineComponent( {
	name: 'LookupInput',
	inheritAttrs: false,
	data() {
		return {
			showMenu: false,
			scrollIndexStart: null as ( number | null ),
			scrollIndexEnd: null as ( number | null ),
			optionsMenuId: generateUid( 'wikit-OptionsMenu' ),
		};
	},
	methods: {
		onScroll( firstIndex: number, lastIndex: number ): void {
			if ( firstIndex !== this.scrollIndexStart || lastIndex !== this.scrollIndexEnd ) {
				this.$emit( 'scroll', firstIndex, lastIndex );
				this.scrollIndexStart = firstIndex;
				this.scrollIndexEnd = lastIndex;
			}

		},
	},

	compatConfig: {
		MODE: 3,
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
