<template>
	<div
		class="wikit wikit-Popover wikit-Popover--bottom"
		@mouseenter="startHover"
		@mouseleave="endHover"
		v-detect-click-outside="clickOutsideHandler"
	>
		<span class="wikit-Popover__target" @click="onTargetClick">
			<!-- @slot Target should always be a button, as we will listen to its click and hover events -->
			<slot name="target" />
		</span>
		<div class="wikit-Popover__content-wrapper" v-if="isContentShown">
			<div class="wikit-Popover__pointer" />
			<div class="wikit-Popover__content">
				<!-- @slot The content of the Popover goes into the default slot. -->
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import detectClickOutside from '@/directives/detectClickOutside';

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
	directives: {
		detectClickOutside,
	},
	props: {
		/**
		 * Use this prop to hide or show the Popover. Can be used with the .sync modifier.
		 */
		isShown: {
			type: Boolean,
			default: false,
		},
		/**
		 * Set to false if the Popover should not be shown (or hidden) by (not) hovering over the target
		 */
		reactToHover: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		clickOutsideHandler(): void {
			this.changeContentVisibility( false );
		},
		changeContentVisibility( isVisible: boolean ): void {
			this.isContentShown = isVisible;
			/**
			 * This can optionally be used with the `.sync` modifier on the `isShown` prop
			 */
			this.$emit( 'update:isShown', isVisible );
		},
		onTargetClick(): void {
			this.changeContentVisibility( true );
		},
		startHover(): void {
			if ( !this.reactToHover ) {
				return;
			}
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
			if ( !this.reactToHover ) {
				return;
			}
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
$base: '.wikit-Popover';

#{$base} {
	display: inline-block;
	position: relative;

	&__tartget {
		display: inline-block;
	}

	&__content-wrapper {
		border-color: $wikit-Popover-border-color;
		border-width: $wikit-Popover-border-width;
		border-style: $wikit-Popover-border-style;
		border-radius: $wikit-Popover-border-radius;
		width: max-content;
		position: absolute;
		display: block;
		box-shadow: $wikit-Popover-box-shadow;
		background-color: $wikit-Popover-background-color;
		max-width: $wikit-Popover-max-width;
	}

	&__content {
		padding-inline: $wikit-Popover-padding;
		padding-block: $wikit-Popover-padding;
		line-height: $wikit-Popover-line-height;
		font-family: $wikit-Popover-font-family;
		font-size: $wikit-Popover-font-size;
		font-weight: $wikit-Popover-font-weight;
		color: $wikit-Popover-color;
	}

	&__pointer {
		position: absolute;
		overflow: hidden;
	}

	&__pointer::before {
		content: '';
		position: absolute;
		width: math.hypot($wikit-Popover-pointer-width/2, $wikit-Popover-pointer-height);
		height: math.hypot($wikit-Popover-pointer-width/2, $wikit-Popover-pointer-height);
		transform: rotate(45deg);
		border: $wikit-Popover-border-width $wikit-Popover-border-style $wikit-Popover-border-color;
		background: $wikit-Popover-background-color;
		box-sizing: border-box;
	}

	&--bottom {
		#{$base}__content-wrapper {
			margin-block-start: $wikit-Popover-distance + $wikit-Popover-pointer-height;
			inset-inline-start: 50%;
			transform: translateX(-50%);
			inset-block-start: 100%;
		}

		#{$base}__pointer {
			width: $wikit-Popover-pointer-width;
			height: $wikit-Popover-pointer-height;
			inset-block-start: -$wikit-Popover-pointer-height;
			inset-inline-start: calc(50% - #{$wikit-Popover-pointer-width} / 2);
		}

		#{$base}__pointer::before {
			inset-block-end: 0;
			transform-origin: bottom left;
		}
	}
}
</style>
