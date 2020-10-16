<template>
	<div
		:class="[
			'wikit',
			'wikit-Message',
			`wikit-Message--${type}`, fullwidth ? '' : 'wikit-Message--default-width'
		]"
	>
		<span class="wikit-Message__content">
			<Icon
				class="wikit-Message__icon"
				:type="type === 'error' ? 'error' : 'alert'"
				:color="type"
				size="large"
			/>
			<span><slot /></span>
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from './Icon.vue';

/**
 * Uses the following components internally: Icon
 */
export default Vue.extend( {
	name: 'Message',
	props: {
		type: {
			type: String,
			required: true,
			validator( value: string ): boolean {
				return [ 'warning', 'error', 'notice', 'success' ].includes( value );
			},
		},
		fullwidth: {
			type: Boolean,
			default: false,
		},
	},

	components: {
		Icon,
	},
} );
</script>

<style lang="scss">
.wikit-Message {
	font-family: $wikit-Message-font-family;
	font-size: $wikit-Message-font-size;
	font-weight: $wikit-Message-font-weight;
	line-height: $wikit-Message-line-height;

	border-width: $wikit-Message-border-width;
	border-style: $wikit-Message-border-style;
	border-radius: $wikit-Message-border-radius;

	&--error {
		border-color: $wikit-Message-error-border-color;
		background: $wikit-Message-error-background-color;
	}

	&--warning {
		border-color: $wikit-Message-warning-border-color;
		background: $wikit-Message-warning-background-color;
	}

	&--notice {
		border-color: $wikit-Message-notice-border-color;
		background: $wikit-Message-notice-background-color;
	}

	&--success {
		border-color: $wikit-Message-success-border-color;
		background: $wikit-Message-success-background-color;
	}

	&--default-width {
		width: $wikit-Message-default-width;
		box-sizing: border-box;
	}

	&__icon {
		margin-inline-end: $wikit-Message-icon-gap-to-text;
		margin-block-start: $wikit-Message-icon-vertical-align-adjustment-top;
	}

	&__content {
		display: flex;
		align-items: flex-start;
		margin-block: $wikit-Message-spacing-vertical;
		margin-inline: $wikit-Message-spacing-horizontal;
	}
}
</style>
