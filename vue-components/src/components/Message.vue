<template>
	<div
		:class="[
			'wikit',
			'wikit-Message',
			`wikit-Message--${type}`
		]"
	>
		<span class="wikit-Message__content">
			<Icon
				class="wikit-Message__icon"
				:type="getIconType"
				:color="type"
				size="large"
			/>
			<span><slot /></span>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';
import { IconTypes } from '@/components/iconProps';

/**
 * Uses the following components internally: Icon
 */
export default defineComponent( {
	name: 'Message',
	props: {
		type: {
			type: String,
			required: true,
			validator( value: string ): boolean {
				return [ 'warning', 'error', 'notice', 'success' ].includes( value );
			},
		},
	},
	computed: {
		getIconType(): string {
			const messageIconTypeMap = {
				error: IconTypes.ERROR,
				warning: IconTypes.ALERT,
				notice: IconTypes.INFO,
				success: IconTypes.CHECKMARK,
			};
			const messageType = this.type as 'warning'|'error'|'notice'|'success';
			return messageIconTypeMap[ messageType ];
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
