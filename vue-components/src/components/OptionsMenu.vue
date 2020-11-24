<template>
	<div
		:class="[ 'wikit', 'wikit-OptionsMenu' ]"
		@scroll.passive="onScroll"
		ref="lookup-menu"
		:style="{ maxHeight: maxHeight ? maxHeight + 'px' : null }"
	>
		<div
			class="wikit-OptionsMenu__item"
			:key="index"
			v-for="(menuItem, index) in menuItems"
			:class="{
				'wikit-OptionsMenu__item--hovered': index === keyboardHoveredItemIndex,
				'wikit-OptionsMenu__item--active': index === activeItemIndex,
				'wikit-OptionsMenu__item--selected': index === selectedItemIndex,
			}"
			@click="$emit( 'select', menuItem )"
			@mousedown.prevent="activeItemIndex = index"
			@mouseup="activeItemIndex = -1"
			ref="menu-items"
		>
			<div
				:class="{
					'wikit-OptionsMenu__item__label': true,
					'wikit-OptionsMenu__item__label--bold': boldLabels,
				}"
			>
				{{ menuItem.label }}
			</div>
			<div class="wikit-OptionsMenu__item__description">
				{{ menuItem.description }}
			</div>
		</div>
		<div v-if="menuItems.length === 0" class="wikit-OptionsMenu__no-results">
			<slot name="no-results" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import debounce from 'lodash/debounce';

/**
 * This is an internal component which used by the Lookup component.
 */
export default Vue.extend( {
	name: 'OptionsMenu',
	data() {
		return {
			maxHeight: null as number|null,
			activeItemIndex: -1,
			keyboardHoveredItemIndex: -1,
		};
	},
	props: {
		menuItems: {
			type: Array,
			default: (): [] => [],
		},
		/**
		 * Whether the label of the options should be bold
		 */
		boldLabels: {
			type: Boolean,
			default: false,
		},
		/**
		 * If one of the items is selected, then this must be its index in the array of menuItems. -1 otherwise
		 */
		selectedItemIndex: {
			type: Number,
			default: -1,
		},
	},
	methods: {
		onKeyUp( event: KeyboardEvent ): void {
			switch ( event.key ) {
				case 'Enter':
					if ( this.keyboardHoveredItemIndex !== -1 ) {
						this.$emit( 'select', this.menuItems[ this.keyboardHoveredItemIndex ] );
					}
					break;
				case 'Escape':
					this.keyboardHoveredItemIndex = -1;
					this.$emit( 'esc' );
					break;
			}
		},
		onKeyDown( event: KeyboardEvent ): void {
			switch ( event.key ) {
				case 'ArrowUp':
					this.keyboardHoveredItemIndex = Math.max( 0, this.keyboardHoveredItemIndex - 1 );
					break;
				case 'ArrowDown':
					this.keyboardHoveredItemIndex = Math.min(
						this.menuItems.length - 1,
						this.keyboardHoveredItemIndex + 1,
					);
					break;
				case 'Tab':
					if ( this.keyboardHoveredItemIndex !== -1 ) {
						this.$emit( 'select', this.menuItems[ this.keyboardHoveredItemIndex ] );
					}
					break;
			}
		},
		resizeMenu(): void {
			const menuItems = this.$refs[ 'menu-items' ] as HTMLElement[];
			// the height automatically adjusts for up to 6 elements, then shows a scrollbar
			const maxNumberOfElementsDisplayed = 6;
			if ( menuItems && menuItems.length > maxNumberOfElementsDisplayed ) {
				const menuHeight = menuItems[ maxNumberOfElementsDisplayed ].offsetTop - menuItems[ 0 ].offsetTop;
				this.maxHeight = menuHeight;
			} else {
				this.maxHeight = null;
			}
		},
		onScroll: debounce( function ( this: Vue ) {
			const rootElem = this.$refs[ 'lookup-menu' ] as HTMLElement;
			const menuItems = this.$refs[ 'menu-items' ] as HTMLElement[];
			const menuTop = rootElem.scrollTop;
			const menuBottom = menuTop + rootElem.offsetHeight;

			const visibleElems = [];
			for ( let i = 0; i < menuItems.length; i++ ) {
				const elementTop = menuItems[ i ].offsetTop;
				const elementBottom = menuItems[ i ].offsetTop + menuItems[ i ].offsetHeight;

				if ( elementTop <= menuBottom && elementBottom >= menuTop ) {
					visibleElems.push( i );
				}
			}
			this.$emit( 'scroll',
				visibleElems[ 0 ],
				visibleElems[ visibleElems.length - 1 ] );
		}, 300 ),
	},
	mounted() {
		this.resizeMenu();
	},

	watch: {
		menuItems(): void {
			this.resizeMenu();
			this.keyboardHoveredItemIndex = -1;
		},
	},
} );
</script>

<style lang="scss">
$base: '.wikit-OptionsMenu';

#{$base} {
	min-width: $wikit-OptionsMenu-min-width;
	max-width: $wikit-OptionsMenu-max-width;
	width: max-content;
	background-color: $wikit-OptionsMenu-background-color;
	border-radius: $wikit-OptionsMenu-border-radius;
	border: $wikit-OptionsMenu-border-width $wikit-OptionsMenu-border-style $wikit-OptionsMenu-border-color;
	box-shadow: $wikit-OptionsMenu-box-shadow;
	overflow-y: auto;
	box-sizing: border-box;
	z-index: 1;

	&__item {
		position: relative;
		padding-block: $wikit-OptionsMenu-item-padding-vertical;
		padding-inline: $wikit-OptionsMenu-item-padding-horizontal;
		transition-property: $wikit-OptionsMenu-item-transition-property;
		transition-duration: $wikit-OptionsMenu-item-transition-duration;
		transition-timing-function: $wikit-OptionsMenu-item-transition-timing-function;

		&:hover,
		&--hovered {
			background-color: $wikit-OptionsMenu-item-hover-background-color;
			cursor: $wikit-OptionsMenu-item-hover-cursor;
		}

		&--active,
		&--active:hover,
		&:active {
			background-color: $wikit-OptionsMenu-item-active-background-color;

			#{$base}__item__label, #{$base}__item__description {
				color: $wikit-OptionsMenu-item-active-color;
			}
		}

		&--selected {
			#{$base}__item__label, #{$base}__item__description {
				color: $wikit-OptionsMenu-item-selected-color;
			}
		}

		&--selected,
		&--selected:hover,
		&--selected#{$base}__item--hovered, {
			background-color: $wikit-OptionsMenu-item-selected-background-color;
		}

		&--selected:hover,
		&--selected#{$base}__item--hovered, {
			#{$base}__item__label, #{$base}__item__description {
				color: $wikit-OptionsMenu-item-selected-hover-color;
			}
		}

		&__label {
			font-family: $wikit-OptionsMenu-item-label-font-family;
			font-size: $wikit-OptionsMenu-item-label-font-size;
			font-weight: $wikit-OptionsMenu-item-label-font-weight-regular;
			color: $wikit-OptionsMenu-item-label-font-color;
			line-height: $wikit-OptionsMenu-item-label-line-height;

			&--bold {
				font-weight: $wikit-OptionsMenu-item-label-font-weight-bold;
			}
		}

		&__description {
			font-family: $wikit-OptionsMenu-item-description-font-family;
			font-size: $wikit-OptionsMenu-item-description-font-size;
			font-weight: $wikit-OptionsMenu-item-description-font-weight;
			color: $wikit-OptionsMenu-item-description-font-color;
			line-height: $wikit-OptionsMenu-item-description-line-height;
		}
	}

	&__no-results {
		font-family: $wikit-OptionsMenu-no-results-font-family;
		font-size: $wikit-OptionsMenu-no-results-font-size;
		font-weight: $wikit-OptionsMenu-no-results-font-weight;
		color: $wikit-OptionsMenu-no-results-font-color;
		line-height: $wikit-OptionsMenu-no-results-line-height;
		padding-block: $wikit-OptionsMenu-no-results-padding-vertical;
		padding-inline: $wikit-OptionsMenu-no-results-padding-horizontal;
	}
}
</style>