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

		<!-- new window icon -->
		<svg
			class="wikit-Icon__svg"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			v-else-if="type === IconTypes.NEWWINDOW"
		>
			<path fill="currentColor" d="M17 17H3V3H8V1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V12H17V17Z" />
			<path fill="currentColor" d="M11 1L14.29 4.29L8.56 10.02L9.98 11.44L15.71 5.71L19 9V1H11Z" />
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

		<!-- link icon -->
		<svg
			viewBox="0 0 20 20"
			fill="none"
			class="wikit-Icon__svg"
			xmlns="http://www.w3.org/2000/svg"
			v-else-if="type === IconTypes.LINK"
		>
			<g clip-path="url(#clip0)">
				<path d="M4.83 15H7.74C7.05648 14.4812 6.52184 13.7913 6.19 13H5C4.20435 13 3.44129 12.6839 2.87868 12.1213C2.31607 11.5587 2 10.7956 2 10C2 9.20435 2.31607 8.44129 2.87868 7.87868C3.44129 7.31607 4.20435 7 5 7H8C8.47923 7.00135 8.95116 7.11748 9.37629 7.33868C9.80142 7.55988 10.1674 7.8797 10.4435 8.27138C10.7196 8.66306 10.8979 9.11519 10.9634 9.58993C11.0289 10.0647 10.9797 10.5482 10.82 11H12.92C12.9706 10.7262 12.9974 10.4485 13 10.17V9.83C13 8.549 12.4911 7.32047 11.5853 6.41467C10.6795 5.50887 9.451 5 8.17 5H4.83C3.549 5 2.32047 5.50887 1.41467 6.41467C0.508874 7.32047 0 8.549 0 9.83L0 10.17C0 11.451 0.508874 12.6795 1.41467 13.5853C2.32047 14.4911 3.549 15 4.83 15V15Z" fill="currentColor" />
				<path d="M15.17 5H12.26C12.9435 5.51879 13.4782 6.20865 13.81 7H15C15.7956 7 16.5587 7.31607 17.1213 7.87868C17.6839 8.44129 18 9.20435 18 10C18 10.7956 17.6839 11.5587 17.1213 12.1213C16.5587 12.6839 15.7956 13 15 13H12C11.5208 12.9987 11.0488 12.8825 10.6237 12.6613C10.1986 12.4401 9.83263 12.1203 9.5565 11.7286C9.28037 11.3369 9.10208 10.8848 9.03658 10.4101C8.97108 9.93534 9.02025 9.45182 9.18 9H7.08C7.02941 9.27384 7.00264 9.55154 7 9.83V10.17C7 11.451 7.50887 12.6795 8.41467 13.5853C9.32047 14.4911 10.549 15 11.83 15H15.17C15.8043 15 16.4324 14.8751 17.0184 14.6323C17.6044 14.3896 18.1368 14.0338 18.5853 13.5853C19.0338 13.1368 19.3896 12.6044 19.6323 12.0184C19.8751 11.4324 20 10.8043 20 10.17V9.83C20 9.19572 19.8751 8.56764 19.6323 7.98164C19.3896 7.39564 19.0338 6.86318 18.5853 6.41467C18.1368 5.96617 17.6044 5.61039 17.0184 5.36766C16.4324 5.12493 15.8043 5 15.17 5V5Z" fill="currentColor" />
			</g>
			<defs>
				<clipPath id="clip0">
					<rect
						width="20"
						height="20"
						fill="transparent"
					/>
				</clipPath>
			</defs>
		</svg>

		<!-- add icon -->
		<svg
			viewBox="0 0 21 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="wikit-Icon__svg"
			v-else-if="type === IconTypes.ADD"
		>
			<path d="M19.5444 8.5H12.0444V1H9.04443V8.5H1.54443V11.5H9.04443V19H12.0444V11.5H19.5444V8.5Z" fill="currentColor" />
		</svg>

		<!-- search icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			class="wikit-Icon__svg"
			v-else-if="type === IconTypes.SEARCH"
		>
			<path d="M7.5 13c3.04 0 5.5-2.46 5.5-5.5S10.54 2 7.5 2 2 4.46 2 7.5 4.46 13 7.5 13zm4.55.46A7.432 7.432 0 017.5 15C3.36 15 0 11.64 0 7.5S3.36 0 7.5 0C11.64 0 15 3.36 15 7.5c0 1.71-.57 3.29-1.54 4.55l6.49 6.49-1.41 1.41-6.49-6.49z" fill="currentColor" />
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

	&--small &__svg {
		width: $wikit-Icon-size-small;
		height: $wikit-Icon-size-small;
	}

	&--xsmall &__svg {
		width: $wikit-Icon-size-xsmall;
		height: $wikit-Icon-size-xsmall;
	}
}
</style>
