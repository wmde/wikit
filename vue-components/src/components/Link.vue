<template>
	<a
		:class="[
			'wikit',
			'wikit-Link',
			(underlined == true) ? `wikit-Link--underlined` : ''
		]"
		:href="href"
		:target="target"
	>
		<Icon
			v-if="icon === 'before'"
			class="wikit-Link__icon wikit-Link__icon--before"
			type="link"
			color="progressive"
			size="large"
		/>
		<span class="wikit-Link__content"><slot /></span>
		<Icon
			v-if="icon === 'after'"
			class="wikit-Link__icon wikit-Link__icon--after"
			type="newwindow"
			color="progressive"
			size="xsmall"
		/>
	</a>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from './Icon.vue';

/**
 * Uses the following components internally: Icon
 */
export default Vue.extend( {
	name: 'Link',
	props: {
		icon: {
			type: String,
			default: 'none',
			validator( value: string ): boolean {
				return [ 'before', 'after', 'none' ].includes( value );
			},
		},
		underlined: {
			type: Boolean,
			default: false,
		},
		href: {
			type: String,
			default: '',
		},
		target: {
			type: String,
			default: '_self',
		},
	},
	components: {
		Icon,
	},
} );
</script>

<style lang="scss">
.wikit-Link {
	@include Link();

	display: flex;
	text-decoration: none;
	align-items: center;

	&--underlined {
		text-decoration: underline;
	}

	&__icon {
		color: $wikit-Link-icon-color;

		&--before {
			padding-inline-end: $wikit-Link-icon-spacing;
		}

		&--after {
			padding-inline-start: $wikit-Link-icon-spacing;
		}
	}

	&__content {
		/**
		* Value of overflow-wrap should be overriden to 'anywhere'
		* to prevent long URLs from overflowing
		*/
		overflow-wrap: break-word;
		hyphens: auto;
	}
}
</style>
