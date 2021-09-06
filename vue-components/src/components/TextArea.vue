<template>
	<div class="wikit wikit-TextArea">
		<span class="wikit-TextArea__label-wrapper">
			<label
				:class="[
					'wikit-TextArea__label',
					disabled ? `wikit-TextArea__label--disabled` : ''
				]"
				:for="id"
			>
				{{ label }}
			</label>
		</span>
		<div class="wikit-TextArea__textarea-wrapper">
			<div class="wikit-TextArea__progress" v-if="loading" role="progressbar" />
			<textarea
				:id="id"
				:class="[
					'wikit-TextArea__textarea',
					`wikit-TextArea__textarea--${resizeType}`,
					{ [ `wikit-TextArea__textarea--${feedback}` ]: feedback }
				]"
				:value="value"
				:rows="rows"
				:placeholder="placeholder"
				:readonly="readOnly || loading"
				:disabled="disabled"
				label=""
				@input="$emit( 'input', $event.target.value )"
			/>
		</div>
		<ValidationMessage
			v-if="error"
			:type="error.type"
			:message="error.message"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent, computed } from '@vue/composition-api';

import ValidationMessage from './ValidationMessage.vue';
import { ResizeLimit, validateLimit } from '@/components/ResizeLimit';
import generateId from '@/components/util/generateUid';
import { errorProp, ErrorProp, getFeedbackTypeFromProps } from '@/compositions/validatable';

Vue.use( VueCompositionAPI );

/**
 * Text areas are multi-line, non auto-sizing input fields that allow manual resizing by users.
 */
export default defineComponent( {
	name: 'TextArea',
	components: { ValidationMessage },
	setup( props: {
		error: ErrorProp;
		resize: string;
	} ) {
		return {
			feedback: computed( getFeedbackTypeFromProps( props ) ),
		};
	},
	props: {
		/**
		 * An initial value for the textarea
		 */
		value: {
			type: String,
			default: '',
		},
		/**
		 * The text area label
		 */
		label: {
			type: String,
			default: '',
		},
		/**
		 * The text area placeholder
		 */
		placeholder: {
			type: String,
			default: '',
		},
		/**
		 * Any validation message that should be displayed with the
		 * component. Accepts an object with a `type` (error | warning) and
		 * a `message`.
		 */
		error: errorProp,
		/**
		 * Defines the amount of lines of text that the text area can take by
		 * default before scroll is triggered, therefore influencing the height
		 * of the component.
		 */
		rows: {
			type: Number,
			default: 2,
		},
		/**
		 * Disable users from editing the content of the textarea, while
		 * still enabling them to focus and interact with the component
		 * otherwise.
		 */
		readOnly: {
			type: Boolean,
			default: false,
		},
		/**
		 * Allows users to expand the component horizontally or vertically
		 * using the expand handler. It can be used to entirely disable manual
		 * resizing.
		 *
		 * Allowed values: `vertical`, `horizontal`,`both`, `none`.
		 */
		resize: {
			type: String,
			validator( value: ResizeLimit ): boolean {
				return validateLimit( value );
			},
			default: ResizeLimit.Vertical,
		},
		/**
		 * Disables the component
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Sets the textarea to loading mode, which displays an indeterminate
		 * progress bar and sets the component to readonly mode.
		 */
		loading: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			// https://github.com/vuejs/vue/issues/5886
			id: generateId( 'wikit-TextArea' ),
		};
	},

	computed: {
		resizeType(): string {
			// Unfortunately, the vue prop validator does not throw or falls
			// back to default values on validation failure, therefore, we need
			// to check for a valid resize limit value
			return validateLimit( this.resize ) ? this.resize : 'vertical';
		},
	},
} );
</script>

<style lang="scss">
	.wikit-TextArea {
		&__label-wrapper {
			display: flex;
			align-items: center;
			gap: $dimension-spacing-small;
		}

		&__label {
			@include Label('block');
		}

		&__textarea-wrapper {
			position: relative;
			overflow: hidden;
		}

		&__progress {
			@include InlineProgressBar;

			&[role=progressbar] {
				position: absolute;
				inset-block-start: 0;
				inset-inline-start: 0;
			}
		}
	}

	.wikit-TextArea__textarea {
		box-sizing: border-box;
		display: block;
		width: 100%;
		// The default resizing behaviour should be on the y axis only
		resize: vertical;
		min-height: $wikit-TextArea-min-height;
		min-width: max-content;

		/**
		* Colors
		*/
		color: $wikit-Input-color;
		background-color: $wikit-Input-background-color;

		/**
		* Typography
		*/
		font-family: $wikit-Input-font-family;
		font-size: $wikit-Input-font-size;
		font-weight: $wikit-Input-font-weight;
		line-height: $wikit-TextArea-line-height;

		/**
		* Spacing
		*/
		padding-inline: $wikit-Input-desktop-padding-inline;
		padding-block: $wikit-Input-desktop-padding-block;

		@media (max-width: $width-breakpoint-mobile) {
			padding-inline: $wikit-Input-mobile-padding-inline;
			padding-block: $wikit-Input-mobile-padding-block;
		}

		/**
		* Borders
		*/
		border-color: $wikit-Input-border-color;
		border-style: $wikit-Input-border-style;
		border-width: $wikit-Input-border-width;
		border-radius: $wikit-Input-border-radius;

		/**
		* Animation
		*/
		// Sets a basis for the inset box-shadow transition which otherwise doesn't work in Firefox.
		// https://stackoverflow.com/questions/25410207/css-transition-not-working-on-box-shadow-property/25410897
		box-shadow: inset 0 0 0 1px transparent;
		transition-duration: $wikit-Input-transition-duration;
		transition-timing-function: $wikit-Input-transition-timing-function;
		transition-property: $wikit-Input-transition-property;

		/**
		* State overrides
		*/
		&[readonly] {
			background-color: $wikit-Input-read-only-background-color;
		}

		&:hover {
			border-color: $wikit-Input-hover-border-color;
		}

		&:focus,
		&:active {
			border-color: $wikit-Input-active-border-color;
			box-shadow: $wikit-Input-active-box-shadow;
		}

		&:focus {
			outline: none;
		}

		&::placeholder {
			font-family: $wikit-Input-placeholder-font-family;
			font-size: $wikit-Input-placeholder-font-size;
			font-weight: $wikit-Input-placeholder-font-weight;
			line-height: $wikit-Input-placeholder-line-height;
			color: $wikit-Input-placeholder-color;
		}

		&:disabled {
			color: $wikit-Input-disabled-color;
			border-color: $wikit-Input-disabled-border-color;
			background-color: $wikit-Input-disabled-background-color;
			box-shadow: none;
		}

		/**
		* Property overrides
		*/
		&--horizontal {
			resize: horizontal;
		}

		&--both {
			resize: both;
		}

		&--none {
			resize: none;
		}

		/**
		* Validation overrides
		*/
		&--error {
			&,
			&:hover,
			&:focus,
			&:active {
				border-color: $wikit-Input-error-border-color;
			}

			&:focus,
			&:active {
				box-shadow: $wikit-Input-error-active-box-shadow;
			}
		}

		&--warning {
			&,
			&:hover,
			&:focus,
			&:active {
				border-color: $wikit-Input-warning-border-color;
			}

			&:focus,
			&:active {
				box-shadow: $wikit-Input-warning-active-box-shadow;
			}
		}
	}
</style>
