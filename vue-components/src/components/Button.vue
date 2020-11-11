<template>
	<button :class="[ 'wikit', 'wikit-Button', `wikit-Button--${ flavor }` ]">
		<slot />
	</button>
</template>

<script lang="ts">
import Vue from 'vue';

/* eslint-disable no-trailing-spaces */
/**
 *  An interactive element signaling a single-step action that will occur when the user clicks or taps on it.
 * 
 * Known issues:
 * 
 * * The styles defined on `:focus` do not apply in Safari and Firefox on macOS.  
 * This seems to be a desired behavior and not a bug  
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus  
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1581369#c5
 */
/* eslint-enable no-trailing-spaces */
export default Vue.extend( {
	name: 'Button',
	props: {
		/**
		 * The flavor of the button
		 */
		flavor: {
			type: String,
			// TODO why does the shorter version cause problems with doc-gen?
			validator( value: string ): boolean {
				return [ 'neutral', 'primaryProgressive', 'primaryDestructive' ].includes( value );
			},
			default: 'neutral',
		},
	},
} );
</script>

<style lang="scss">
$base: '.wikit-Button';

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
	transition-duration: $wikit-Button-transition-duration;
	transition-timing-function: $wikit-Button-transition-timing-function;
	transition-property: $wikit-Button-transition-property;
	white-space: nowrap;

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

		&#{$base}--primaryProgressive {
			color: $wikit-Button-primaryProgressive-color;
			background-color: $wikit-Button-primaryProgressive-background-color;
			border-color: $wikit-Button-primaryProgressive-border-color;

			&:hover {
				background-color: $wikit-Button-primaryProgressive-hover-background-color;
				border-color: $wikit-Button-primaryProgressive-hover-border-color;
			}

			&:active {
				background-color: $wikit-Button-primaryProgressive-active-background-color;
				border-color: $wikit-Button-primaryProgressive-active-border-color;
			}

			// A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
			&:focus:not(:active) {
				background-color: $wikit-Button-primaryProgressive-focus-background-color;
				border-color: $wikit-Button-primaryProgressive-focus-border-color;
				box-shadow: $wikit-Button-primaryProgressive-focus-box-shadow;
			}
		}

		&#{$base}--primaryDestructive {
			color: $wikit-Button-primaryDestructive-color;
			background-color: $wikit-Button-primaryDestructive-background-color;
			border-color: $wikit-Button-primaryDestructive-border-color;

			&:hover {
				background-color: $wikit-Button-primaryDestructive-hover-background-color;
				border-color: $wikit-Button-primaryDestructive-hover-border-color;
			}

			&:active {
				background-color: $wikit-Button-primaryDestructive-active-background-color;
				border-color: $wikit-Button-primaryDestructive-active-border-color;
			}

			// A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
			&:focus:not(:active) {
				background-color: $wikit-Button-primaryDestructive-focus-background-color;
				border-color: $wikit-Button-primaryDestructive-focus-border-color;
				box-shadow: $wikit-Button-primaryDestructive-focus-box-shadow;
			}
		}
	}

	&:disabled {
		color: $wikit-Button-disabled-color;
		background-color: $wikit-Button-disabled-background-color;
		border-color: $wikit-Button-disabled-border-color;
		cursor: $wikit-Button-disabled-cursor;
	}

	// should ideally be taken care of by the globally applied style reset (ress)
	// https://github.com/filipelinhares/ress/pull/24
	&:focus {
		outline: none;
	}
}
</style>
