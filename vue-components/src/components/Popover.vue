<template>
	<div class="wikit wikit-Popover" @mouseenter="startHover" @mouseleave="endHover">
		<div class="wikit-Popover__content" v-if="isContentShown">
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

const HOVER_SHOW_HIDE_DELAY_IN_MS = 100;

export default Vue.extend( {
	name: 'Popover',
	data() {
		return {
			isContentShown: false,
			showContentTimeoutID: null as number | null,
			hideContentTimeoutID: null as number | null,
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
	methods: {
		changeContentVisibility( isVisible: boolean ): void {
			this.isContentShown = isVisible;
			this.$emit( 'update:isShown', isVisible );
		},
		startHover(): void {
			if ( this.isContentShown && this.hideContentTimeoutID !== null ) {
				clearTimeout( this.hideContentTimeoutID );
				this.hideContentTimeoutID = null;
				return;
			}
			this.showContentTimeoutID = setTimeout(
				this.changeContentVisibility,
				HOVER_SHOW_HIDE_DELAY_IN_MS,
				true,
			);
		},
		endHover(): void {
			if ( !this.isContentShown && this.showContentTimeoutID !== null ) {
				clearTimeout( this.showContentTimeoutID );
				this.showContentTimeoutID = null;
				return;
			}
			this.hideContentTimeoutID = setTimeout(
				this.changeContentVisibility,
				HOVER_SHOW_HIDE_DELAY_IN_MS,
				false,
			);
		},
	},
	mounted() {
		this.isContentShown = this.isShown;
	},
	watch: {
		isShown( newShowProp: boolean ): void {
			this.isContentShown = newShowProp;
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
		inset-inline-start: 50%;
		transform: translateX(-50%);
		position: absolute;
		inset-block-start: 100%;
		display: block;
		padding-inline: $wikit-Popover-padding;
		padding-block: $wikit-Popover-padding;
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
	}
}
</style>
