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

/**
 * Tables display categorical information organized across rows and columns in
 * order to facilitate the comparative analysis of data.
 *
 * The WiKit table component provides a wrapper around the common HTML table
 * elements such as `<thead>`, `<tbody>`, `<tr>`, `<th>` and `<td>`, to apply
 * design system styles to tabular data.
 *
 * Adding a `data-header` attribute to the cells allows us to maintain the column
 * headers and display them in the table's linearized form to provide additional
 * context.
 *
 * **Example:**
 *
 * ```html
 * <td data-header="Column Header">Content Here</td>
 * ```
 */
export default Vue.extend( {
	// eslint-disable-next-line no-undef
	name: process.env.VUE_APP_VUE3COMPAT ? 'WikitTable' : 'Table',
	props: {
		/**
		 * Sets the viewport breakpoint that triggers the linearized view of the
		 * table in the context of the application.
		 *
		 * Allowed Values:  "desktop", "tablet", "mobile"
		 */
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
		* Completely removes thead, modern screen readers will expose the
		* generated content
		*/
		thead {
			display: none;
			visibility: hidden;
		}

		/**
		* Make everything display flex for alignment
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
		* Adding a data-header attribute to the cells
		* lets us add text before the content to provide
		* the missing context.
		*
		* Markup:
		*   <td data-header="Column Header">Content Here</td>
		*/
		/* stylelint-disable selector-no-qualifying-type  */
		th[data-header]::before,
		td[data-header]::before {
			content: attr(data-header);
			display: block;
			font-weight: $wikit-Table-cell-header-font-weight;
			flex-basis: 40%;
			// Ensure headers stay exactly 40%
			// even if values are wider than 60%
			min-width: 40%;
		}

		th:not([data-header]) {
			font-weight: $wikit-Table-cell-header-font-weight;
		}

		// Hide empty cells
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
		background-color: $wikit-Table-background-color;
		color: $wikit-Table-cell-color;

		/**
		* Typography
		*/
		font-family: $wikit-Table-cell-font-family;
		font-size: $wikit-Table-cell-font-size;
		font-weight: $wikit-Table-cell-font-weight;

		tbody tr:hover {
			background-color: $background-color-base-hover;
			transition-duration: $transition-duration-medium;
			transition-timing-function: $transition-timing-function-ease;
			transition-property: $transition-property-background-color;
		}

		tr {
			/**
			* Layout
			*/

			/**
			* Borders
			*/
			border-bottom-style: $wikit-Table-border-style;
			border-bottom-width: $wikit-Table-border-width;
			border-radius: $wikit-Table-border-radius;
			border-bottom-color: $wikit-Table-border-color;
		}

		th,
		td {
			/**
			* Layout
			*/
			padding-inline: $wikit-Table-cell-spacing-horizontal;

			/**
			* Typography
			*/
			line-height: $wikit-Table-cell-line-height;
			text-align: start;
			overflow-wrap: break-word;
			hyphens: auto;
		}

		td {
			/**
			* Layout
			*/
			height: $wikit-Table-cell-height;
			padding-block: $wikit-Table-cell-spacing-vertical;

			/**
			* Typography
			*/
			vertical-align: middle;
		}

		th {
			/**
			* Layout
			*/
			padding-block: $wikit-Table-cell-header-spacing-vertical;
			/**
			* Typography
			*/
			font-weight: $wikit-Table-cell-header-font-weight;
			vertical-align: top;
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
