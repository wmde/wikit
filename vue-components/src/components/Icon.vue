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

		<!-- clear icon -->
		<svg
			class="wikit-Icon__svg"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			v-else-if="type === IconTypes.CLEAR"
		>
			<path fill="currentColor" d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.66 14.24l-1.41 1.41L10 11.41l-4.24 4.25-1.42-1.42L8.59 10 4.34 5.76l1.42-1.42L10 8.59l4.24-4.24 1.41 1.41L11.41 10z" />
		</svg>

		<!-- edit icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			class="wikit-Icon__svg"
			fill="none"
			v-else-if="type === IconTypes.EDIT"
		>
			<path fill="currentColor" d="M16.77 8l1.94-2a1 1 0 000-1.41l-3.34-3.3a1 1 0 00-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96-4.75-4.75z" />
		</svg>
		<!-- trash icon -->
		<svg
			class="wikit-Icon__svg"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			v-else-if="type === IconTypes.TRASH"
		>
			<path d="M17 2H13.5L12.5 1H7.5L6.5 2H3V4H17V2ZM4 17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19H14C14.5304 19 15.0391 18.7893 15.4142 18.4142C15.7893 18.0391 16 17.5304 16 17V5H4V17Z" fill="currentColor" />
		</svg>

		<!-- info icon -->
		<svg
			viewBox="0 0 20 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="wikit-Icon__svg"
			v-else-if="type === IconTypes.INFOOUTLINED"
		>
			<g clip-path="url(#clip0)">
				<path d="M10 19.1667C7.71324 19.1289 5.53071 18.2037 3.9135 16.5865C2.2963 14.9693 1.37109 12.7868 1.33334 10.5C1.37109 8.21324 2.2963 6.0307 3.9135 4.4135C5.53071 2.79629 7.71324 1.87108 10 1.83333C12.2868 1.87108 14.4693 2.79629 16.0865 4.4135C17.7037 6.0307 18.6289 8.21324 18.6667 10.5C18.6223 12.7846 17.695 14.9634 16.0792 16.5792C14.4634 18.195 12.2847 19.1223 10 19.1667ZM10 0.5C8.02219 0.5 6.08879 1.08649 4.4443 2.1853C2.79981 3.28412 1.51809 4.8459 0.761209 6.67316C0.00433286 8.50042 -0.1937 10.5111 0.192152 12.4509C0.578004 14.3907 1.53041 16.1725 2.92894 17.5711C4.32746 18.9696 6.10929 19.922 8.0491 20.3078C9.98891 20.6937 11.9996 20.4957 13.8268 19.7388C15.6541 18.9819 17.2159 17.7002 18.3147 16.0557C19.4135 14.4112 20 12.4778 20 10.5C20 7.84783 18.9464 5.3043 17.0711 3.42893C15.1957 1.55357 12.6522 0.5 10 0.5ZM10.6667 8.5V13.94H12V15.1667H8.09334V13.94H9.33334V9.83333H8V8.5H10.6667ZM9.33334 5.83333H10.6667V7.16667H9.33334V5.83333Z" fill="currentColor" />
			</g>
			<defs>
				<clipPath id="clip0">
					<rect
						width="20"
						height="20"
						fill="transparent"
						transform="translate(0 0.5)"
					/>
				</clipPath>
			</defs>
		</svg>

	</span>
	<!-- eslint-enable max-len -->
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
