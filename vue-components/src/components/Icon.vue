<template>
	<!-- eslint-disable max-len -->
	<span :class="['wikit', 'wikit-Icon', `wikit-Icon--${size}`, `wikit-Icon--${color}`]">
		<!-- error icon -->
		<svg
			class="wikit-Icon__svg"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			v-if="type === IconTypes.ERROR"
		>
			<path
				fill="currentColor"
				d="M11.4939 0H4.50612L0 4.50612V11.5102L4.50612 16H11.5102L16 11.4939V4.50612L11.4939 0Z
					M8.8 11.9938H7.2V10.3999H8.8V11.9938Z
					M8.8 9.6H7.2V4H8.8V9.6Z"
			/>
		</svg>

		<!-- warning icon -->
		<svg
			class="wikit-Icon__svg"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			v-else-if="type === IconTypes.ALERT"
		>
			<path fill="currentColor" d="M9.163 1.68234C9.06078 1.4381 8.89901 1.22746 8.69449 1.07231C8.48997 0.917151 8.25017 0.823144 7.99999 0.800049C7.75116 0.82453 7.51294 0.919178 7.30987 1.07425C7.10679 1.22933 6.94619 1.43922 6.84459 1.68234L0.672272 13.0631C0.0337565 14.2368 0.558251 15.2 1.82768 15.2H14.1723C15.4417 15.2 15.9662 14.2368 15.3277 13.0631L9.163 1.68234ZM8.76013 12.7717H7.23986V11.1528H8.76013V12.7717ZM8.76013 9.53394H7.23986V4.67728H8.76013V9.53394Z" />
		</svg>

		<!-- info icon -->
		<svg
			class="wikit-Icon__svg"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			v-else-if="type === IconTypes.INFO"
		>
			<path fill="currentColor" d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM9 5H11V7H9V5ZM9 9H11V15H9V9Z" />
		</svg>

		<!-- checkmark icon -->
		<svg
			class="wikit-Icon__svg"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			v-else-if="type === IconTypes.CHECKMARK"
		>
			<path fill="currentColor" d="M6.34812 14.6259L1.6041 9.65425L0 11.3353L6.34812 18L20 3.693L18.3959 2L6.34812 14.6259Z" />
		</svg>
	</span>
	<!-- eslint-disable max-len -->
</template>

<script lang="ts">
import Vue from 'vue';
import { IconTypes, iconColors, iconSizes } from './iconProps';

/**
 * Every SVG icon that is added to this component needs to have at least one element (e.g. a `<path>`) with
 * `fill="currentColor"` for the part of the icon that is intended to be colored by the `color` prop.
 *
 * More info on `fill="currentColor"`:
 * https://css-tricks.com/cascading-svg-fill-color/
 *
 */
export default Vue.extend( {
	name: 'Icon',
	data: () => { return { IconTypes }; },

	props: {
		type: {
			type: String,
			validator( value: string ): boolean {
				return Object.values( IconTypes ).includes( value as IconTypes );
			},
			required: true,
		},

		color: {
			type: String,
			validator( value: string ): boolean {
				return iconColors.includes( value );
			},
			default: 'base',
		},

		size: {
			type: String,
			validator( value: string ): boolean {
				return iconSizes.includes( value );
			},
			default: 'large',
		},
	},
} );
</script>

<style lang="scss">
.wikit-Icon {
	display: inline-flex;
	vertical-align: middle;
	align-items: center;

	&--base {
		color: $wikit-Icon-color-base;
	}

	&--error {
		color: $wikit-Icon-color-error;
	}

	&--warning {
		color: $wikit-Icon-color-warning;
	}

	&--notice {
		color: $wikit-Icon-color-notice;
	}

	&--success {
		color: $wikit-Icon-color-success;
	}

	&--large &__svg {
		width: $wikit-Icon-size-large;
		height: $wikit-Icon-size-large;
	}

	&--medium &__svg {
		width: $wikit-Icon-size-medium;
		height: $wikit-Icon-size-medium;
	}
}
</style>
