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
	font-weight: $font-weight-bold;
	font-size: $font-size-style-label; // unit? px vs em vs rem
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
		color: $wikit-Button-neutral-default-color;
		background-color: $wikit-Button-neutral-default-background-color;
		border-color: $wikit-Button-neutral-default-border-color;

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

			&:focus {
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
