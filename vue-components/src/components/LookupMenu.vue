<template>
	<div :class="[ 'wikit', 'wikit-LookupMenu' ]">
		<div
			class="wikit-LookupMenu__item"
			:key="index"
			v-for="(menuItem, index) in menuItems"
			:class="{
				'wikit-LookupMenu__item--selected': index === selectedItemIndex,
				'wikit-LookupMenu__item--active': index === selectedItemIndex && hasActiveElement
			}"
			@click="$emit( 'select', menuItem )"
			@mousedown.prevent
		>
			<div class="wikit-LookupMenu__item__label">
				{{ menuItem.label }}
			</div>
			<div class="wikit-LookupMenu__item__description">
				{{ menuItem.description }}
			</div>
		</div>
		<div v-if="menuItems.length === 0" class="wikit-LookupMenu__no-results">
			<slot name="no-results" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * This is an internal component which used by the Lookup component.
 */
export default Vue.extend( {
	name: 'LookupMenu',
	props: {
		menuItems: {
			type: Array,
			default: (): [] => [],
		},
		selectedItemIndex: {
			type: Number,
			default: -1,
		},
		hasActiveElement: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		resizeMenu(): void {
			const rootElem = this.$el as HTMLElement;
			const menuItems = rootElem.querySelectorAll( '.wikit-LookupMenu__item' ) as NodeListOf<HTMLElement>;
			// the height automatically adjusts for up to 6 elements, then shows a scrollbar
			const maxNumberOfElementsDisplayed = 6;
			if ( menuItems.length > maxNumberOfElementsDisplayed ) {
				const menuHeight = menuItems[ maxNumberOfElementsDisplayed ].offsetTop - menuItems[ 0 ].offsetTop;
				rootElem.style.maxHeight = menuHeight + 'px';
			}
		},
	},

	mounted() {
		this.resizeMenu();
	},

	watch: {
		menuItems(): void {
			this.resizeMenu();
		},
	},
} );
</script>

<style lang="scss">
$base: '.wikit-LookupMenu';

#{$base} {
	min-width: $wikit-LookupMenu-min-width;
	max-width: $wikit-LookupMenu-max-width;
	width: max-content;
	background-color: $wikit-LookupMenu-background-color;
	border-radius: $wikit-LookupMenu-border-radius;
	border: $wikit-LookupMenu-border-width $wikit-LookupMenu-border-style $wikit-LookupMenu-border-color;
	box-shadow: $wikit-LookupMenu-box-shadow;
	overflow-y: auto;
	box-sizing: border-box;
	z-index: 1;

	&__item {
		padding-block: $wikit-LookupMenu-item-padding-vertical;
		padding-inline: $wikit-LookupMenu-item-padding-horizontal;
		transition-property: $wikit-LookupMenu-item-transition-property;
		transition-duration: $wikit-LookupMenu-item-transition-duration;
		transition-timing-function: $wikit-LookupMenu-item-transition-timing-function;

		&:hover,
		&--selected {
			background-color: $wikit-LookupMenu-item-hover-background-color;
			cursor: $wikit-LookupMenu-item-hover-cursor;
		}

		&:active,
		&--active {
			background-color: $wikit-LookupMenu-item-active-background-color;

			#{$base}__item__label, #{$base}__item__description {
				color: $wikit-LookupMenu-item-active-color;
			}
		}

		&__label {
			font-family: $wikit-LookupMenu-item-label-font-family;
			font-size: $wikit-LookupMenu-item-label-font-size;
			font-weight: $wikit-LookupMenu-item-label-font-weight;
			color: $wikit-LookupMenu-item-label-font-color;
			line-height: $wikit-LookupMenu-item-label-line-height;
		}

		&__description {
			font-family: $wikit-LookupMenu-item-description-font-family;
			font-size: $wikit-LookupMenu-item-description-font-size;
			font-weight: $wikit-LookupMenu-item-description-font-weight;
			color: $wikit-LookupMenu-item-description-font-color;
			line-height: $wikit-LookupMenu-item-description-line-height;
		}
	}

	&__no-results {
		font-family: $wikit-LookupMenu-no-results-font-family;
		font-size: $wikit-LookupMenu-no-results-font-size;
		font-weight: $wikit-LookupMenu-no-results-font-weight;
		color: $wikit-LookupMenu-no-results-font-color;
		line-height: $wikit-LookupMenu-no-results-line-height;
		padding-block: $wikit-LookupMenu-no-results-padding-vertical;
		padding-inline: $wikit-LookupMenu-no-results-padding-horizontal;
	}
}
</style>
