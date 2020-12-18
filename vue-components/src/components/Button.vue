<template>
	<button
		:class="[
			'wikit',
			'wikit-Button',
			`wikit-Button--${type}`,
			`wikit-Button--${variant}`,
			iconOnly ? `wikit-Button--iconOnly` : '',
		]"
	>
		<slot />
	</button>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, {
	defineComponent,
	onMounted,
} from '@vue/composition-api';

Vue.use( VueCompositionAPI );

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
export default defineComponent( {
	name: 'Button',
	props: {
		/**
		 * The type of the button
		 *
		 * Allowed values: `neutral`, `progressive`, `destructive`
		 */
		type: {
			type: String,
			validator( value: string ): boolean {
				return [ 'neutral', 'progressive', 'destructive' ].includes( value );
			},
			default: 'neutral',
		},
		/**
		 * The variant of the button
		 *
		 * Allowed values: `normal`, `primary`, `quiet`
		 */
		variant: {
			type: String,
			validator( value: string ): boolean {
				return [ 'normal', 'primary', 'quiet' ].includes( value );
			},
			default: 'normal',
		},
		iconOnly: {
			type: Boolean,
			default: false,
		},
	},
	setup( props: {
		type: 'neutral' | 'progressive' | 'destructive';
		variant: 'normal' | 'primary' | 'quiet';
	} ) {
		onMounted( () => {
			const supportedCombinations = {
				normal: [ 'neutral' ],
				primary: [ 'progressive', 'destructive' ],
				quiet: [ 'neutral', 'progressive', 'destructive' ],
			};
			if ( !supportedCombinations[ props.variant ].includes( props.type ) ) {
				throw new Error(
					`The combination of variant "${props.variant}" and type "${props.type}" is not yet supported!`,
				);
			}
		} );
	},
} );
</script>

<style lang="scss">
$base: ".wikit-Button";

#{$base} {
  padding-inline: $wikit-Button-medium-padding-horizontal;
  padding-block: $wikit-Button-medium-padding-vertical;
  font-family: $wikit-Button-font-family;
  font-weight: $wikit-Button-font-weight;
  font-size: $wikit-Button-font-size; // unit? px vs em vs rem
  line-height: $wikit-Button-line-height;
  cursor: pointer;
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

  &#{$base}--normal {
    &#{$base}--neutral {
      color: $wikit-Button-normal-neutral-color;
      background-color: $wikit-Button-normal-neutral-background-color;
      border-color: $wikit-Button-normal-neutral-border-color;

      &:hover {
        color: $wikit-Button-normal-neutral-hover-color;
        background-color: $wikit-Button-normal-neutral-hover-background-color;
        border-color: $wikit-Button-normal-neutral-hover-border-color;
      }

      &:active {
        color: $wikit-Button-normal-neutral-active-color;
        background-color: $wikit-Button-normal-neutral-active-background-color;
        border-color: $wikit-Button-normal-neutral-active-border-color;
      }
      // A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
      &:focus:not(:active) {
        color: $wikit-Button-normal-neutral-focus-color;
        background-color: $wikit-Button-normal-neutral-focus-background-color;
        border-color: $wikit-Button-normal-neutral-focus-border-color;
        box-shadow: $wikit-Button-normal-neutral-focus-box-shadow;
      }
    }
  }

  &#{$base}--primary {
    &#{$base}--progressive {
      color: $wikit-Button-primary-color;
      background-color: $wikit-Button-primary-progressive-background-color;
      border-color: $wikit-Button-primary-progressive-border-color;

      &:hover {
        background-color: $wikit-Button-primary-progressive-hover-background-color;
        border-color: $wikit-Button-primary-progressive-hover-border-color;
      }

      &:active {
        background-color: $wikit-Button-primary-progressive-active-background-color;
        border-color: $wikit-Button-primary-progressive-active-border-color;
      }

      // A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
      &:focus:not(:active) {
        background-color: $wikit-Button-primary-progressive-focus-background-color;
        border-color: $wikit-Button-primary-progressive-focus-border-color;
        box-shadow: $wikit-Button-primary-progressive-focus-box-shadow;
      }
    }

    &#{$base}--destructive {
      color: $wikit-Button-primary-color;
      background-color: $wikit-Button-primary-destructive-background-color;
      border-color: $wikit-Button-primary-destructive-border-color;

      &:hover {
        background-color: $wikit-Button-primary-destructive-hover-background-color;
        border-color: $wikit-Button-primary-destructive-hover-border-color;
      }

      &:active {
        background-color: $wikit-Button-primary-destructive-active-background-color;
        border-color: $wikit-Button-primary-destructive-active-border-color;
      }

      // A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
      &:focus:not(:active) {
        background-color: $wikit-Button-primary-destructive-focus-background-color;
        border-color: $wikit-Button-primary-destructive-focus-border-color;
        box-shadow: $wikit-Button-primary-destructive-focus-box-shadow;
      }
    }
  }

  &#{$base}--normal:disabled,
  &#{$base}--primary:disabled {
    color: $wikit-Button-normal-disabled-color;
    background-color: $wikit-Button-normal-disabled-background-color;
    border-color: $wikit-Button-normal-disabled-border-color;
    cursor: default;
    pointer-events: none;
  }

  &#{$base}--quiet {
    &#{$base}--neutral {
      color: $wikit-Button-quiet-neutral-color;
      background-color: $wikit-Button-quiet-background-color;
      border-color: $wikit-Button-quiet-border-color;

      &:hover {
        color: $wikit-Button-quiet-neutral-hover-color;
        background-color: $wikit-Button-quiet-neutral-hover-background-color;
        border-color: $wikit-Button-quiet-neutral-hover-border-color;
      }

      &:active {
        color: $wikit-Button-quiet-neutral-active-color;
        background-color: $wikit-Button-quiet-neutral-active-background-color;
        border-color: $wikit-Button-quiet-neutral-active-border-color;
      }

      // A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
      &:focus:not(:active) {
        color: $wikit-Button-quiet-neutral-focus-color;
        background-color: $wikit-Button-quiet-neutral-focus-background-color;
        border-color: $wikit-Button-quiet-neutral-focus-border-color;
        box-shadow: $wikit-Button-quiet-neutral-focus-box-shadow;
      }
    }
    &#{$base}--progressive {
      color: $wikit-Button-quiet-progressive-color;
      background-color: $wikit-Button-quiet-background-color;
      border-color: $wikit-Button-quiet-border-color;

      &:hover {
        color: $wikit-Button-quiet-progressive-hover-color;
        background-color: $wikit-Button-quiet-progressive-hover-background-color;
        border-color: $wikit-Button-quiet-progressive-hover-border-color;
      }

      &:active {
        color: $wikit-Button-quiet-progressive-active-color;
        background-color: $wikit-Button-quiet-progressive-active-background-color;
        border-color: $wikit-Button-quiet-progressive-active-border-color;
      }

      // A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
      &:focus:not(:active) {
        color: $wikit-Button-quiet-progressive-focus-color;
        background-color: $wikit-Button-quiet-progressive-focus-background-color;
        border-color: $wikit-Button-quiet-progressive-focus-border-color;
        box-shadow: $wikit-Button-quiet-progressive-focus-box-shadow;
      }
    }
    &#{$base}--destructive {
      color: $wikit-Button-quiet-destructive-color;
      background-color: $wikit-Button-quiet-background-color;
      border-color: $wikit-Button-quiet-border-color;

      &:hover {
        color: $wikit-Button-quiet-destructive-hover-color;
        background-color: $wikit-Button-quiet-destructive-hover-background-color;
        border-color: $wikit-Button-quiet-destructive-hover-border-color;
      }

      &:active {
        color: $wikit-Button-quiet-destructive-active-color;
        background-color: $wikit-Button-quiet-destructive-active-background-color;
        border-color: $wikit-Button-quiet-destructive-active-border-color;
      }

      // A clicked button is both :active and :focused. Using :not(:active) to avoid mixing the two.
      &:focus:not(:active) {
        color: $wikit-Button-quiet-destructive-focus-color;
        background-color: $wikit-Button-quiet-destructive-focus-background-color;
        border-color: $wikit-Button-quiet-destructive-focus-border-color;
        box-shadow: $wikit-Button-quiet-destructive-focus-box-shadow;
      }
    }
  }
  &#{$base}--quiet:disabled {
    color: $wikit-Button-quiet-disabled-color;
    background-color: $wikit-Button-quiet-background-color;
    border-color: $wikit-Button-quiet-border-color;
    cursor: default;
  }

  &#{$base}--iconOnly {
    padding-inline: $wikit-Button-icon-only-medium-padding-horizontal;

    @media (max-width: $width-breakpoint-mobile) {
      padding-inline: $wikit-Button-icon-only-large-padding-horizontal;
    }
  }

  // should ideally be taken care of by the globally applied style reset (ress)
  // https://github.com/filipelinhares/ress/pull/24
  &:focus {
    outline: none;
  }
}
</style>
