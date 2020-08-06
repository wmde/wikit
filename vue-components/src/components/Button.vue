<template>
	<button :class="[ 'wikit', 'wikit-Button', `wikit-Button--${ flavor }` ]">
		<slot />
	</button>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * A Button
 */
export default Vue.extend( {
	name: 'Button',
	props: {
		/**
		 * The flavor of the button.
		 * One of: neutral
		 */
		flavor: {
			type: String,
			validator( value: string ): boolean {
				return [ 'neutral' ].includes( value );
			},
			default: 'neutral',
		},
	},
} );
</script>

<style lang="scss">
$wikit-Button-medium-padding-vertical: $dimension-padding-vertical-medium;
$wikit-Button-medium-padding-horizontal: $dimension-padding-horizontal-medium;

$wikit-Button-large-padding-vertical: $dimension-padding-vertical-large;
$wikit-Button-large-padding-horizontal: $dimension-padding-horizontal-large;

$wikit-Button-font-family: $font-family-style-label;
$wikit-Button-font-weight: $font-weight-bold;
$wikit-Button-font-size: $font-size-style-label; // unit? px vs em vs rem
$wikit-Button-line-height: $font-line-height-style-label;

/**
 * Construction site identified:
 * How do we name the component level token?
 *
 * Suggestion for naming scheme:
 * wikit-<Component>-[prop]-[state]-css-property
 */
$wikit-Button-default-cursor: $cursor-pointer;
$wikit-Button-disabled-cursor: $cursor-default;

$wikit-Button-neutral-border-width: $border-width-thin;
$wikit-Button-neutral-border-style: $border-style-base;
$wikit-Button-neutral-border-radius: $border-radius-base;

.wikit-Button {
	padding-inline: $wikit-Button-medium-padding-horizontal;
	padding-block: $wikit-Button-medium-padding-vertical;
	font-family: $wikit-Button-font-family;
	font-weight: $font-weight-bold;
	font-size: $font-size-style-label;
	line-height: $wikit-Button-line-height;
	cursor: $wikit-Button-default-cursor;

	// TODO use breakpoint mixin?
	@media (max-width: $width-breakpoint-mobile) {
		padding-inline: $wikit-Button-large-padding-horizontal;
		padding-block: $wikit-Button-large-padding-vertical;
	}

	&--neutral {
		border-width: $wikit-Button-neutral-border-width;
		border-style: $wikit-Button-neutral-border-style;
		border-radius: $wikit-Button-neutral-border-radius;

		$wikit-Button-neutral-default-color: $font-color-base;
		$wikit-Button-neutral-default-border-color: $border-color-neutral-default;
		$wikit-Button-neutral-default-background-color: $background-color-neutral-default;

		color: $wikit-Button-neutral-default-color;
		background-color: $wikit-Button-neutral-default-background-color;
		border-color: $wikit-Button-neutral-default-border-color;

		&:not(:disabled) {
			&:hover {
				$wikit-Button-neutral-hover-color: $color-modifier-lighten-base-10;
				$wikit-Button-neutral-hover-border-color: $border-color-neutral-hover;
				$wikit-Button-neutral-hover-background-color: $background-color-neutral-hover;

				color: $wikit-Button-neutral-hover-color;
				background-color: $wikit-Button-neutral-hover-background-color;
				border-color: $wikit-Button-neutral-hover-border-color;
			}

			&:active {
				$wikit-Button-neutral-active-color: $font-color-emphasized;
				$wikit-Button-neutral-active-border-color: $border-color-neutral-active;
				$wikit-Button-neutral-active-background-color: $background-color-neutral-active;

				color: $wikit-Button-neutral-active-color;
				background-color: $wikit-Button-neutral-active-background-color;
				border-color: $wikit-Button-neutral-active-border-color;
			}

			&:focus {
				$wikit-Button-neutral-focus-color: $font-color-base;
				$wikit-Button-neutral-focus-border-color: $border-color-neutral-focus;
				$wikit-Button-neutral-focus-background-color: $background-color-neutral-focus;
				$wikit-Button-neutral-focus-box-shadow: $box-shadow-inset-focus-progressive;

				color: $wikit-Button-neutral-focus-color;
				background-color: $wikit-Button-neutral-focus-background-color;
				border-color: $wikit-Button-neutral-focus-border-color;
				box-shadow: $wikit-Button-neutral-focus-box-shadow;
			}
		}
	}

	&:disabled {
		cursor: $wikit-Button-disabled-cursor;
	}

	// should ideally be taken care of by the globally applied style reset (ress)
	// see https://github.com/filipelinhares/ress/pull/24
	&:focus {
		outline: none;
	}
}
</style>
