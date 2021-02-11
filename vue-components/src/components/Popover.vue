<template>
	<div class="wikit wikit-Popover">
		<div class="wikit-Popover__content" v-if="isShownData">
			<!-- @slot The content of the Popover goes into the default slot. -->
			<slot />
		</div>
		<span class="wikit-Popover__target">
			<!-- @slot Target should always be a button, as we will listen to its click and hover events -->
			<slot name="target" />
		</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'Popover',
	data() {
		return {
			isShownData: false,
		};
	},
	props: {
		/**
		 * Use this prop to hide or show the Popover. Can be used with the .sync modifier.
		 */
		isShown: {
			type: Boolean,
			default: false,
		},
	},
	mounted() {
		this.isShownData = this.isShown;
	},
	watch: {
		isShown( newShowProp: boolean ): void {
			this.isShownData = newShowProp;
		},
	},
} );
</script>

<style lang="scss">
.wikit-Popover {
	display: inline-block;
	position: relative;

	&__tartget {
		display: inline-block;
	}

	&__content {
		width: max-content;
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		top: 100%;
		display: block;
		padding: $wikit-Popover-padding;
		border-color: $wikit-Popover-border-color;
		border-width: $wikit-Popover-border-width;
		border-style: $wikit-Popover-border-style;
		border-radius: $wikit-Popover-border-radius;
		max-width: $wikit-Popover-max-width;
		line-height: $wikit-Popover-line-height;
		font-family: $wikit-Popover-font-family;
		font-size: $wikit-Popover-font-size;
		font-weight: $wikit-Popover-font-weight;
		color: $wikit-Popover-color;
		background-color: $wikit-Popover-background-color;
		box-shadow: $wikit-Popover-box-shadow;
		// FIXME: which property? which timing function?
		transition: $wikit-Popover-transition-delay;
	}
}
</style>
