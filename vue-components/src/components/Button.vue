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
		 * The flavor of the button
		 */
		flavor: {
			type: String,
			// TODO why does the shorter version cause problems with doc-gen?
			validator( value: string ): boolean {
				return [ 'neutral' ].includes( value );
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

.wikit-Button {
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

	&--neutral {
		color: $wikit-Button-neutral-color;
		background-color: $wikit-Button-neutral-background-color;
		border-color: $wikit-Button-neutral-border-color;

		&:not(:disabled) {
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
	}

	&:disabled {
		cursor: $wikit-Button-disabled-cursor;
	}

	// should ideally be taken care of by the globally applied style reset (ress)
	&:focus {
		outline: none;
	}
}
</style>
