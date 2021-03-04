<template>
	<span class="wikit wikit-checkbox">
		<input
			type="checkbox"
			:id="id"
			class="wikit-checkbox__input"
			@change="$emit( 'update:checked', $event.target.checked )"
			:value="value"
			:checked="checked"
			:disabled="disabled"
		>
		<label class="wikit-checkbox__label" :for="id">{{ label }}</label>
		<slot name="suffix" />
	</span>
</template>

<script lang="ts">
import Vue from 'vue';
import generateUid from '@/components/util/generateUid';

export default Vue.extend( {
	name: 'Checkbox',
	props: {
		checked: {
			required: true,
			type: Boolean,
		},
		value: {
			default: null,
			type: String,
		},
		label: {
			required: true,
			type: String,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			// https://github.com/vuejs/vue/issues/5886
			id: generateUid( 'wikit-Checkbox' ),
		};
	},
} );
</script>

<style lang="scss">
$label: '.wikit-checkbox__label';

.wikit-checkbox {
	display: flex;

	&__label {
		@include Label;
		display: flex;
		align-items: center;
		word-break: break-all;
		margin-inline-end: $dimension-layout-xxsmall;

		&::before {
			min-width: $wikit-Checkbox-input-size;
			min-height: $wikit-Checkbox-input-size;
			box-sizing: border-box;

			border-width: $wikit-Checkbox-input-border-width;
			border-color: $wikit-Checkbox-input-border-color;
			border-style: $wikit-Checkbox-input-border-style;
			border-radius: $wikit-Checkbox-input-border-radius;
			background-color: $wikit-Checkbox-input-background-color; /* Workaround Firefox e.a. */

			content: ' ';
			margin-inline-end: $wikit-Checkbox-input-right-spacing;
			display: flex;
			transition-property: $wikit-Checkbox-input-transition-property;
			transition-duration: $wikit-Checkbox-input-transition-duration;
			transition-timing-function: $wikit-Checkbox-input-transition-timing-function;
		}

		&:hover {
			&::before {
				border-color: $wikit-Checkbox-input-hover-border-color;
			}
		}

		&:active {
			&::before {
				border-color: $wikit-Checkbox-input-active-border-color;
				background-color: $wikit-Checkbox-input-active-background-color;
			}
		}
	}

	&__input {/* see: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */
		width: 0;
		height: 0;
		opacity: 0;
		inset-inline-start: 0;/* we move it out of our way */
		position: absolute;
		&:focus + #{$label} {
			&::before {
				border-color: $wikit-Checkbox-input-focus-border-color;
				box-shadow: $wikit-Checkbox-input-focus-box-shadow;
			}
		}

		&:disabled {
			+ #{$label} {
				color: $wikit-Checkbox-label-disabled-color;
				pointer-events: none;
			}
			&:checked + #{$label}::before {
				border-color: $wikit-Checkbox-input-disabled-border-color;
				background-color: $wikit-Checkbox-input-disabled-background-color;
			}
		}

		&:checked + #{$label} {
			&::before {
				border-color: $wikit-Checkbox-input-selected-border-color;
				background-color: $wikit-Checkbox-input-selected-background-color;
				background-image: svg-load('check.svg', fill=$wikit-Checkbox-input-selected-icon-color);
				background-position: 50% 50%;
				background-repeat: no-repeat;
				background-size: $wikit-Checkbox-input-selected-icon-size;
			}

			&:hover::before {
				background-color: $wikit-Checkbox-input-selected-hover-background-color;
				border-color: $wikit-Checkbox-input-selected-hover-border-color;
			}

			&:active::before {
				background-color: $wikit-Checkbox-input-selected-active-background-color;
				border-color: $wikit-Checkbox-input-selected-active-border-color;
			}
		}
		&:checked:focus + #{$label} {
			&::before {
				box-shadow: $wikit-Checkbox-input-selected-focus-box-shadow;
				background-color: $wikit-Checkbox-input-selected-focus-background-color;
				border-color: $wikit-Checkbox-input-selected-focus-border-color;
			}
		}
	}
}
</style>
