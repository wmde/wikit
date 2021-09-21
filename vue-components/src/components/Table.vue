<template>
	<table
		:class="[
			'wikit',
			'wikit-Table',
			`wikit-Table--linear-${breakpoint}`
		]"
	>
		<slot />
	</table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Breakpoint, validateBreakpoint } from './Breakpoint';

export default Vue.extend( {
	name: 'Table',
	props: {
		linearize: {
			type: String as PropType<Breakpoint>,
			validator( value: Breakpoint ): boolean {
				return validateBreakpoint( value );
			},
			default: Breakpoint.Tablet,
		},
	},
	computed: {
		breakpoint(): string {
			return validateBreakpoint( this.linearize ) ? this.linearize : 'tablet';
		},
	},
} );
</script>

<style lang="scss">
	@mixin linear-table {
		/**
		* Wipe the thead from the face of the earth
		* modern screen readers will expose the
		* generated content
		*/
		thead {
			display: none;
			visibility: hidden;
		}

		/**
		* make everything display flex for alignment
		*/
		tbody,
		tr,
		th,
		td {
			height: auto;
			display: flex;
			flex-direction: column;
		}

		td,
		th {
			flex-direction: row;
			flex-basis: 60%;
		}

		/**
		* Labeling
		*
		* Adding a data-title attribute to the cells
		* lets us add text before the content to provide
		* the missing context.
		*
		* Markup:
		*   <td data-title="Column Header">Content Here</td>
		*
		* Display:
		*   Column Header: Content Here
		*/
		/* stylelint-disable selector-no-qualifying-type  */
		th[data-header]::before,
		td[data-header]::before {
			content: attr(data-header);
			display: block;
			font-weight: bold;
			flex-basis: 40%;
		}

		th:not([data-header]) {
			font-weight: bold;
		}

		// hide empty cells
		td:empty {
			display: none;
		}
	}

	.wikit-Table {
		/**
		* Layout
		*/
		// As the specificationn state that the table columns should gain their
		// width from cell content (instead of just header content / width) we
		// revert to using the default table layout algorithm. This is done in
		// order to avoid changing the table's display proterty and thus
		// oblitirating it's inehrit accesibility:
		// See: https://www.tpgi.com/short-note-on-what-css-display-properties-do-to-table-semantics/
		table-layout: auto;
		width: 100%;

		/**
		* Borders
		*/
		border-collapse: collapse;

		/**
		* Colors
		*/
		background-color: $background-color-base-default;
		color: $font-color-base;

		/**
		* Typography
		*/
		font-family: $font-family-style-body;
		font-size: $font-size-style-body;
		font-weight: $font-weight-style-body;

		tr {
			/**
			* Layout
			*/
			height: $dimension-min-height-xlarge;

			/**
			* Borders
			*/
			border-bottom-style: $border-style-base;
			border-bottom-width: $border-width-thin;
			border-radius: $border-radius-none;
			border-bottom-color: $border-color-base-subtle;
		}

		th,
		td {
			/**
			* Layout
			*/
			padding-inline: $dimension-spacing-medium;
			padding-block: $dimension-spacing-small;

			/**
			* Typography
			*/
			line-height: $font-line-height-style-label;
			text-align: start;
			vertical-align: middle;
			overflow-wrap: break-word;
			hyphens: auto;
		}

		th {
			/**
			* Typography
			*/
			font-weight: $font-weight-bold;
		}

		&--linear-mobile {
			@media (max-width: $width-breakpoint-mobile) {
				@include linear-table;
			}
		}

		&--linear-tablet {
			@media (max-width: $width-breakpoint-tablet) {
				@include linear-table;
			}
		}

		&--linear-desktop {
			@media (max-width: $width-breakpoint-desktop) {
				@include linear-table;
			}
		}
	}
</style>
