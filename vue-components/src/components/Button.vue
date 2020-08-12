<template>
	<button :class="[ 'wikit', 'wikit-Button', `wikit-Button--${ type }` ]">
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
		 * The type of the button
		 */
		type: {
			type: String,
			// TODO why does the shorter version cause problems with doc-gen?
			validator( value: string ): boolean {
				return [ 'neutral', 'progressive', 'destructive' ].includes( value );
			},
			default: 'neutral',
		},
	},
} );
</script>

<style lang="scss">
/**
 * Construction site identified:
 * How do we name the component level token?
 *
 * Suggestion for naming scheme:
 * wikit-<Component>-[prop]-[state]-css-property
 */

$base: ".wikit-Button";

#{$base} {
	padding-inline: $wikit-Button-medium-padding-horizontal;
	padding-block: $wikit-Button-medium-padding-vertical;
	font-family: $wikit-Button-font-family;
	font-weight: $wikit-Button-font-weight;
	font-size: $wikit-Button-font-size; // unit? px vs em vs rem
	line-height: $wikit-Button-line-height;
	cursor: $wikit-Button-cursor;
	border-width: $wikit-Button-border-width;
	border-style: $wikit-Button-border-style;
	border-radius: $wikit-Button-border-radius;

	// TODO use breakpoint mixin?
	@media (max-width: $width-breakpoint-mobile) {
		padding-inline: $wikit-Button-large-padding-horizontal;
		padding-block: $wikit-Button-large-padding-vertical;
	}

	&:not(:disabled) {
		&#{$base}--neutral {
			color: $wikit-Button-neutral-color;
			background-color: $wikit-Button-neutral-background-color;
			border-color: $wikit-Button-neutral-border-color;

			&:hover {
				color: $wikit-Button-neutral-hover-color;
				background-color: $wikit-Button-neutral-hover-background-color;
				border-color: $wikit-Button-neutral-hover-border-color;
			}

			&:active {
				color: $wikit-Button-neutral-active-color;
				background-color: $wikit-Button-neutral-active-background-color;
				border-color: $wikit-Button-neutral-active-border-color;
			}

			// A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
			&:focus:not(:active) {
				color: $wikit-Button-neutral-focus-color;
				background-color: $wikit-Button-neutral-focus-background-color;
				border-color: $wikit-Button-neutral-focus-border-color;
				box-shadow: $wikit-Button-neutral-focus-box-shadow;
			}
		}

		&#{$base}--progressive {
			color: $wikit-Button-progressive-color;
			background-color: $wikit-Button-progressive-background-color;
			border-color: $wikit-Button-progressive-border-color;

			&:hover {
				background-color: $wikit-Button-progressive-hover-background-color;
				border-color: $wikit-Button-progressive-hover-border-color;
			}

			&:active {
				background-color: $wikit-Button-progressive-active-background-color;
				border-color: $wikit-Button-progressive-active-border-color;
			}

			// A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
			&:focus:not(:active) {
				background-color: $wikit-Button-progressive-focus-background-color;
				border-color: $wikit-Button-progressive-focus-border-color;
				box-shadow: $wikit-Button-progressive-focus-box-shadow;
				transition-timing-function: $wikit-Button-progressive-focus-transition-timing-function;
				transition-property: $wikit-Button-progressive-focus-transition-property;
				transition-duration: $wikit-Button-progressive-focus-transition-duration;
			}
		}

		&#{$base}--destructive {
			color: $wikit-Button-destructive-color;
			background-color: $wikit-Button-destructive-background-color;
			border-color: $wikit-Button-destructive-border-color;

			&:hover {
				background-color: $wikit-Button-destructive-hover-background-color;
				border-color: $wikit-Button-destructive-hover-border-color;
			}

			&:active {
				background-color: $wikit-Button-destructive-active-background-color;
				border-color: $wikit-Button-destructive-active-border-color;
			}

			// A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
			&:focus:not(:active) {
				background-color: $wikit-Button-destructive-focus-background-color;
				border-color: $wikit-Button-destructive-focus-border-color;
				box-shadow: $wikit-Button-destructive-focus-box-shadow;
				transition-timing-function: $wikit-Button-destructive-focus-transition-timing-function;
				transition-property: $wikit-Button-destructive-focus-transition-property;
				transition-duration: $wikit-Button-destructive-focus-transition-duration;
			}
		}

		&:hover {
			transition-timing-function: $wikit-Button-hover-transition-timing-function;
			transition-property: $wikit-Button-hover-transition-property;
			transition-duration: $wikit-Button-hover-transition-duration;
		}

		&:active {
			transition-timing-function: $wikit-Button-active-transition-timing-function;
			transition-property: $wikit-Button-active-transition-property;
			transition-duration: $wikit-Button-active-transition-duration;
		}

		&:focus:not(:active) {
			transition-timing-function: $wikit-Button-focus-transition-timing-function;
			transition-property: $wikit-Button-focus-transition-property;
			transition-duration: $wikit-Button-focus-transition-duration;
		}
	}

	&:disabled {
		color: $wikit-Button-disabled-color;
		background-color: $wikit-Button-disabled-background-color;
		border-color: $wikit-Button-disabled-border-color;
		cursor: $wikit-Button-disabled-cursor;
	}

	// should ideally be taken care of by the globally applied style reset (ress)
	&:focus {
		outline: none;
	}
}
</style>
