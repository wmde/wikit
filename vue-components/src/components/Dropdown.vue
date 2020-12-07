<template>
	<div
		:class="[ 'wikit', 'wikit-Dropdown' ]"
		@keydown="triggerKeyDown"
	>
		<label
			class="wikit-Dropdown__label"
			@click="$refs.select.focus()"
		>{{ label }}</label>
		<div
			class="wikit-Dropdown__select"
			:tabindex="!disabled && '0'"
			:disabled="disabled"
			@click="onClick"
			@blur="showMenu = false"
			ref="select"
		>
			<span
				class="wikit-Dropdown__selectedOption"
				v-if="value"
			>{{ value.label }}</span>
			<span
				class="wikit-Dropdown__placeholder"
				v-else
			>{{ placeholder }}</span>
			<svg
				class="wikit-Dropdown__arrow"
				fill="none"
				viewBox="0 0 12 12"
				xmlns="http://www.w3.org/2000/svg"
			><path fill="currentColor" d="M6 10L12 3.94231L11 3L6 7.98077L1 3L5.2958e-07 3.94231L6 10Z" /></svg>
		</div>
		<OptionsMenu
			class="wikit-Dropdown__menu"
			:menu-items="menuItems"
			:selected-item-index="selectedItemIndex"
			v-show="showMenu"
			@select="onSelect"
			@esc="onEsc"
			ref="menu"
		/>
	</div>
</template>

<script lang="ts">
import Vue, { PropType, VueConstructor } from 'vue';
import { MenuItem } from '@/components/MenuItem';
import OptionsMenu from '@/components/OptionsMenu.vue';
import isEqual from 'lodash.isequal';

export default ( Vue as VueConstructor<Vue & { $refs: {
	menu: InstanceType<typeof OptionsMenu>;
	select: HTMLElement;
}; }> ).extend( {
	name: 'Dropdown',
	data() {
		return {
			showMenu: false,
		};
	},
	props: {
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
		/**
		 * The selected menu item, can be of type `MenuItem` or `null`.
		 *
		 * The data usually comes from the consumer's `v-model` annotation on the Lookup component.
		 */
		value: {
			type: Object,
			default: null,
		},
		placeholder: {
			type: String,
			default: '',
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
	methods: {
		triggerKeyDown( event: KeyboardEvent ): void {
			switch ( event.key ) {
				case 'Enter':
					if ( !this.showMenu ) {
						this.startShowingTheMenu();
						return;
					}
					break;
				case 'ArrowDown':
					this.startShowingTheMenu();
			}
			this.$refs.menu.onKeyDown( event );
		},
		async startShowingTheMenu(): Promise<void> {
			this.showMenu = true;
			await this.$nextTick();
			this.$refs.menu.resizeMenu();
		},
		onEsc(): void {
			this.showMenu = false;
		},

		onSelect( menuItem: MenuItem ): void {
			this.showMenu = false;

			// the following comment generates the event's description for the docs tab in storybook
			/**
			 * This event is emitted whenever an item is selected on the Dropdown.
			 *
			 * @property {MenuItem|null} The event payload contains the whole MenuItem object.
			 *                           The payload is null when no item is selected or the item is deselected.
			 */
			this.$emit( 'input', menuItem );
		},
		onClick(): void {
			this.startShowingTheMenu();
		},
	},
	components: {
		OptionsMenu,
	},
} );
</script>

<style lang="scss">
$base: '.wikit-Dropdown';

#{$base} {
	position: relative;

	&__select {
		display: flex;
		justify-content: space-between;
		align-items: center;

		border-width: $wikit-Dropdown-border-width;
		border-color: $wikit-Dropdown-border-color;
		border-radius: $wikit-Dropdown-border-radius;
		border-style: $wikit-Dropdown-border-style;
		box-sizing: border-box;
		padding-inline: $wikit-Dropdown-desktop-padding-inline;
		padding-block: $wikit-Dropdown-desktop-padding-block;
		@media (max-width: $width-breakpoint-mobile) {
			padding-inline: $wikit-Dropdown-mobile-padding-inline;
			padding-block: $wikit-Dropdown-mobile-padding-block;
		}

		cursor: pointer;
		background-color: $wikit-Dropdown-background-color;
		transition-duration: $wikit-Dropdown-transition-duration;
		transition-timing-function: $wikit-Dropdown-transition-timing-function;
		transition-property: $wikit-Dropdown-transition-property;

		&[disabled] {
			background-color: $wikit-Dropdown-disabled-background-color;
			border-color: $wikit-Dropdown-disabled-border-color;
			pointer-events: none;

			#{$base}__placeholder,
			#{$base}__selectedOption,
			#{$base}__arrow {
				color: $wikit-Dropdown-disabled-color;
			}
		}

		&:hover {
			border-color: $wikit-Dropdown-hover-border-color;
			background-color: $wikit-Dropdown-hover-background-color;
		}

		&:focus,
		&:active {
			border-color: $wikit-Dropdown-active-border-color;
			background-color: $wikit-Dropdown-active-background-color;
			box-shadow: $wikit-Dropdown-active-box-shadow;
		}
	}

	&__arrow {
		height: $wikit-Dropdown-icon-expand-size;
		margin-left: $wikit-Dropdown-icon-expand-spacing-horizontal;
	}

	&__selectedOption {
		line-height: $wikit-Dropdown-selected-option-line-height;
		font-family: $wikit-Dropdown-selected-option-font-family;
		font-size: $wikit-Dropdown-selected-option-font-size;
		font-weight: $wikit-Dropdown-selected-option-font-weight;
		color: $wikit-Dropdown-selected-option-color;
	}

	&__placeholder {
		color: $wikit-Dropdown-placeholder-color;
		line-height: $wikit-Dropdown-placeholder-line-height;
		font-family: $wikit-Dropdown-placeholder-font-family;
		font-size: $wikit-Dropdown-placeholder-font-size;
		font-weight: $wikit-Dropdown-placeholder-font-weight;
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
