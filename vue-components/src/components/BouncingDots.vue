<template>
	<div
		class="wikit wikit-bouncingdots"
		:class="[ `wikit-bouncingdots`, `wikit-bouncingdots--${size}` ]"
	>
		<div class="bounce" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { bouncingDotsSizes } from './bouncingDotsProps';

export default Vue.extend( {
	name: 'BouncingDots',
	props: {
		size: {
			type: String,
			validator( value: string ): boolean {
				return bouncingDotsSizes.includes( value );
			},
			default: 'small',
		},
	},
} );
</script>

<style lang="scss">

.wikit-bouncingdots {
	white-space: nowrap;

	.bounce,
	&::before,
	&::after {
		content: '';
		display: inline-block;
		background-color: $wikit-BouncingDots-background-color;
		border-radius: $wikit-BouncingDots-border-radius;
		animation: bounce-delay $wikit-BouncingDots-animation-duration infinite ease-in-out both;
		animation-delay: $wikit-BouncingDots-animation-delay-default;
	}

	&::before {
		margin-inline-end: $wikit-BouncingDots-margin-right;
		animation-delay: $wikit-BouncingDots-animation-delay-before;
	}

	&::after {
		margin-inline-start: $wikit-BouncingDots-margin-left;
		animation-delay: $wikit-BouncingDots-animation-delay-after;
	}

	&--small .bounce,
	&--small::before,
	&--small::after {
		width: $wikit-BouncingDots-width-small;
		height: $wikit-BouncingDots-width-small;
	}

	&--medium .bounce,
	&--medium::before,
	&--medium::after {
		width: $wikit-BouncingDots-width-medium;
		height: $wikit-BouncingDots-width-medium;
	}
}

@keyframes bounce-delay {
	0%,
	50%,
	100% {
		transform: scale(0.625);
	}

	20% {
		opacity: 0.87;
		transform: scale(1);
	}
}
</style>
