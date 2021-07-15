<template>
	<div
		class="wikit wikit-Popover"
		:class="[ `wikit-Popover--${adjustedPosition || position}`, { 'wikit-Popover--flush-edges': flushEdges } ]"
		@mouseenter="startHover"
		@mouseleave="endHover"
		@keydown="triggerKeyDown"
		v-detect-click-outside="hideContent"
	>
		<span class="wikit-Popover__target" @click="onTargetClick">
			<!-- @slot Target should always be a button, as we will listen to its click and hover events -->
			<slot name="target" />
		</span>
		<div class="wikit-Popover__content-wrapper" v-if="isContentShown" ref="wrapper">
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
import { PopoverPositions } from './PopoverProps';

const HOVER_SHOW_HIDE_DELAY_IN_MS = 100;

export default Vue.extend( {
	name: 'Popover',
	data() {
		return {
			isContentShown: false,
			adjustedPosition: null as string | null,
			flushEdges: false,
			showContentTimeoutID: null as number | null,
			hideContentTimeoutID: null as number | null,
			windowResizeEventHandler: null as ( () => void ) | null,
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
		/**
		 * Use this prop to set position of the popover in relation to the element that triggers it.
		 *
		 * Note that the actual/effective position of the popover might be different,
		 * unless forcePosition is also set.
		 */
		position: {
			type: String,
			validator( value: string ): boolean {
				return Object.values( PopoverPositions ).includes( value as PopoverPositions );
			},
			default: 'top',
		},
		/**
		 * Set to true to force the Popover to use the position specified by the position prop.
		 *
		 * By default (false), the Popover may choose a different position to avoid overflow.
		 */
		forcePosition: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		hideContent(): void {
			this.changeContentVisibility( false );
		},
		changeContentVisibility( isVisible: boolean ): void {
			if ( isVisible === this.isContentShown ) {
				return;
			}
			this.isContentShown = isVisible;
			/**
			 * This can optionally be used with the `.sync` modifier on the `isShown` prop
			 */
			this.$emit( 'update:isShown', isVisible );

			this.avoidOverflow();
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
		triggerKeyDown( event: KeyboardEvent ): void {
			switch ( event.key ) {
				case 'Enter':
					if ( this.isContentShown ) {
						event.preventDefault();
						this.hideContent();
					}
					break;
				case ' ':
					if ( this.isContentShown ) {
						event.preventDefault();
						this.hideContent();
					}
					break;
				case 'Escape':
					event.preventDefault();
					this.hideContent();
					break;
				case 'Tab':
					this.hideContent();
					break;
			}
		},
		/**
		 * @return {number} The amount by which the popover overflows the viewport, in pixels.
		 */
		getOverflow(): number {
			const wrapper = this.$refs.wrapper as HTMLElement | null;
			if ( !wrapper ) {
				return 0;
			}
			const wrapperRect = wrapper.getBoundingClientRect();
			const viewportWidth = document.documentElement.clientWidth;
			let overflow = 0;
			if ( wrapperRect.left < 0 ) {
				overflow += -wrapperRect.left;
			}
			if ( wrapperRect.right > viewportWidth ) {
				overflow += wrapperRect.right - viewportWidth;
			}
			return overflow;
		},
		/**
		 * Try to avoid having the popover overflow the viewport, by various means.
		 */
		async avoidOverflow(): Promise<void> {
			if ( !this.isContentShown ) {
				return;
			}
			this.adjustedPosition = null;
			this.flushEdges = false;

			await this.$nextTick();
			const wrapper = this.$refs.wrapper as HTMLElement;
			delete wrapper.style.maxWidth;

			if ( !this.forcePosition ) {
				await this.avoidOverflowBySwappingAxes();
				await this.avoidOverflowByAdjustingHorizontalSubposition();
			}
			await this.avoidOverflowByMakingEdgesFlush();
			await this.avoidOverflowBySettingMaxWidth();
			if ( !this.forcePosition ) {
				await this.avoidOverflowByAdjustingHorizontalSubposition();
				await this.avoidOverflowBySettingMaxWidth();
			}
		},
		/**
		 * Try to avoid having the popover overflow the viewport,
		 * by swapping the horizontal and vertical subposition.
		 *
		 * This only applies to positions where the horizontal subposition comes first.
		 * For positions without a vertical subposition (e.g. PopoverPositions.END),
		 * we arbitrarily choose to move them to the top rather than the bottom.
		 */
		async avoidOverflowBySwappingAxes(): Promise<void> {
			if ( !this.getOverflow() ) {
				return;
			}

			const swappedPositions: Partial<Record<string, string>> = {
				[ PopoverPositions.START ]: PopoverPositions.TOPSTART,
				[ PopoverPositions.STARTTOP ]: PopoverPositions.TOPSTART,
				[ PopoverPositions.STARTBOTTOM ]: PopoverPositions.BOTTOMSTART,
				[ PopoverPositions.END ]: PopoverPositions.TOPEND,
				[ PopoverPositions.ENDTOP ]: PopoverPositions.TOPEND,
				[ PopoverPositions.ENDBOTTOM ]: PopoverPositions.BOTTOMEND,
			};
			this.adjustedPosition = swappedPositions[ this.position ] || null;

			await this.$nextTick();
		},
		/**
		 * Try to avoid having the popover overflow the viewport,
		 * by adjusting the horizontal subposition (start/center/end).
		 *
		 * For each horizontal subposition, this tries the other two options,
		 * and picks the one out of the three with the least overflow.
		 */
		async avoidOverflowByAdjustingHorizontalSubposition(): Promise<void> {
			const initialOverflow = this.getOverflow();
			if ( !initialOverflow ) {
				return;
			}

			let lowestOverflow = initialOverflow;
			let bestAdjustedPosition = this.adjustedPosition;
			const otherPositions: Partial<Record<string, string[]>> = {
				[ PopoverPositions.TOPSTART ]: [ PopoverPositions.TOP, PopoverPositions.TOPEND ],
				[ PopoverPositions.TOP ]: [ PopoverPositions.TOPSTART, PopoverPositions.TOPEND ],
				[ PopoverPositions.TOPEND ]: [ PopoverPositions.TOP, PopoverPositions.TOPSTART ],
				[ PopoverPositions.BOTTOMSTART ]: [ PopoverPositions.BOTTOM, PopoverPositions.BOTTOMEND ],
				[ PopoverPositions.BOTTOM ]: [ PopoverPositions.BOTTOMSTART, PopoverPositions.BOTTOMEND ],
				[ PopoverPositions.BOTTOMEND ]: [ PopoverPositions.BOTTOM, PopoverPositions.BOTTOMSTART ],
			};
			for ( const otherPosition of otherPositions[ this.adjustedPosition || this.position ] || [] ) {
				this.adjustedPosition = otherPosition;
				await this.$nextTick();
				const overflowAfterAdjustment = this.getOverflow();
				if ( overflowAfterAdjustment < lowestOverflow ) {
					lowestOverflow = overflowAfterAdjustment;
					bestAdjustedPosition = otherPosition;
				}
			}

			if ( bestAdjustedPosition !== this.adjustedPosition ) {
				this.adjustedPosition = bestAdjustedPosition;
				await this.$nextTick();
			}
		},
		/**
		 * Try to avoid having the popover overflow the viewport,
		 * by making its edges flush with those of the target button.
		 *
		 * By default, for the non-center horizontal subpositions,
		 * both the pointer and the edge of the popover are close to the center of the button.
		 * We can gain some space by moving the edge of the popover to the edge of the button
		 * (assuming that the button has some substantial width:
		 * for small buttons, especially icon buttons, this makes no difference),
		 * at the cost of also moving the pointer along with it.
		 * The movement of the pointer away from the button’s center is unwanted,
		 * but unavoidable given the current DOM structure
		 * (where it’s positioned relative to the popover, not the button).
		 */
		async avoidOverflowByMakingEdgesFlush(): Promise<void> {
			if ( !this.getOverflow() ) {
				return;
			}
			this.flushEdges = true;
		},
		/**
		 * Try to avoid having the popover overflow the viewport,
		 * by setting a max-width on it.
		 *
		 * The max-width is chosen such that the end edge of the popover
		 * stays 5vw away from the edge of the viewport,
		 * as long as this can be done without letting the width drop below 256px.
		 */
		async avoidOverflowBySettingMaxWidth(): Promise<void> {
			if ( !this.getOverflow() ) {
				return;
			}
			const wrapper = this.$refs.wrapper as HTMLElement;
			const wrapperRect = wrapper.getBoundingClientRect();
			const dir = getComputedStyle( wrapper ).direction;
			if ( dir === 'ltr' ) {
				wrapper.style.maxWidth = `max( 256px, 95vw - max( 5vw, ${wrapperRect.left}px ) )`;
			} else {
				wrapper.style.maxWidth = `max( 256px, max( 95vw, ${wrapperRect.right}px ) - 5vw )`;
			}
		},
	},
	mounted() {
		this.isContentShown = this.isShown;
		this.avoidOverflow();
		this.windowResizeEventHandler = this.avoidOverflow.bind( this );
		window.addEventListener( 'resize', this.windowResizeEventHandler );
	},
	beforeDestroy() {
		if ( this.windowResizeEventHandler ) {
			window.removeEventListener( 'resize', this.windowResizeEventHandler );
		}
	},
	watch: {
		isShown( newShowProp: boolean ): void {
			this.isContentShown = newShowProp;
			this.avoidOverflow();
		},
		position: 'avoidOverflow',
		forcePosition: 'avoidOverflow',
	},
} );
</script>

<style lang="scss">
$base: '.wikit-Popover';
$pointer-edge-length: math.hypot($wikit-Popover-pointer-width/2, $wikit-Popover-pointer-height);

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
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	&__pointer::before {
		content: '';
		position: absolute;
		width: $pointer-edge-length;
		height: $pointer-edge-length;
		transform: rotate(45deg);
		transform-origin: center;
		border: $wikit-Popover-border-width $wikit-Popover-border-style $wikit-Popover-border-color;
		background: $wikit-Popover-background-color;
		box-sizing: border-box;
	}

	@mixin bottom {
		#{$base}__content-wrapper {
			inset-block-start: 100%;
			margin-block-start: $wikit-Popover-gap + $wikit-Popover-pointer-height;
		}

		#{$base}__pointer {
			inset-block-start: -$wikit-Popover-pointer-height;
		}

		#{$base}__pointer::before {
			inset-block-end: calc(-1 * #{$pointer-edge-length} / 2);
		}
	}

	@mixin top {
		#{$base}__content-wrapper {
			inset-block-end: 100%;
			margin-block-end: $wikit-Popover-gap + $wikit-Popover-pointer-height;
		}

		#{$base}__pointer {
			width: $wikit-Popover-pointer-width;
			height: $wikit-Popover-pointer-height;
			inset-block-start: 100%;
		}

		#{$base}__pointer::before {
			inset-block-start: calc(-1 * #{$pointer-edge-length} / 2);
		}
	}

	@mixin end {
		#{$base}__content-wrapper {
			margin-inline-start: $wikit-Popover-gap + $wikit-Popover-pointer-height;
			inset-inline-start: 100%;
		}

		#{$base}__pointer {
			width: $wikit-Popover-pointer-height;
			height: $wikit-Popover-pointer-width;
			inset-inline-start: -$wikit-Popover-pointer-height;
		}

		#{$base}__pointer::before {
			inset-inline-end: calc(-1 * #{$pointer-edge-length} / 2);
		}
	}

	@mixin start {
		#{$base}__content-wrapper {
			margin-inline-end: 0.75em;
			inset-inline-end: 100%;
		}

		#{$base}__pointer {
			width: $wikit-Popover-pointer-width;
			height: $wikit-Popover-pointer-width;
			inset-inline-start: 100%;
		}

		#{$base}__pointer::before {
			inset-inline-start: calc(-1 * #{$pointer-edge-length} / 2);
		}
	}

	@mixin horizontal( $subposition ) {
		@if $subposition == center {
			display: inline-flex;
			justify-content: center;
		}

		#{$base}__content-wrapper {

			@if $subposition == start {
				inset-inline-end: calc(50% - #{$wikit-Popover-pointer-width} / 2 -
				#{$wikit-Popover-pointer-margin-horizontal});
			}

			@if $subposition == end {
				inset-inline-start: calc(50% - #{$wikit-Popover-pointer-width} / 2 -
				#{$wikit-Popover-pointer-margin-horizontal});
			}
		}

		&#{$base}--flush-edges #{$base}__content-wrapper {

			@if $subposition == start {
				inset-inline-end: min(50% - #{$wikit-Popover-pointer-width} / 2 -
				#{$wikit-Popover-pointer-margin-horizontal}, 0px);
			}

			@if $subposition == end {
				inset-inline-start: min(50% - #{$wikit-Popover-pointer-width} / 2 -
				#{$wikit-Popover-pointer-margin-horizontal}, 0px);
			}
		}

		#{$base}__pointer {
			width: $wikit-Popover-pointer-width;
			height: $wikit-Popover-pointer-height;

			@if $subposition == center {
				inset-inline-start: calc(50% - #{$wikit-Popover-pointer-width} / 2);
			}

			@if $subposition == end {
				inset-inline-start: $wikit-Popover-pointer-margin-horizontal;
			}

			@if $subposition == start {
				inset-inline-end: $wikit-Popover-pointer-margin-horizontal;
			}
		}
	}

	@mixin vertical( $subposition ) {
		#{$base}__content-wrapper {
			@if $subposition == center {
				transform: translateY(-50%);
				inset-block-start: 50%;
			}

			@if $subposition == top {
				inset-block-end: calc(50% - #{$wikit-Popover-pointer-width} / 2 -
				#{$wikit-Popover-pointer-margin-vertical});
			}

			@if $subposition == bottom {
				inset-block-start: calc(50% - #{$wikit-Popover-pointer-width} / 2 -
				#{$wikit-Popover-pointer-margin-vertical});
			}
		}

		#{$base}__pointer {
			@if $subposition == center {
				transform: translate(0, -50%);
				inset-block-start: 50%;
			}

			@if $subposition == top {
				inset-block-end: 0;
				margin-block-end: $wikit-Popover-pointer-margin-vertical;
			}

			@if $subposition == bottom {
				inset-block-start: $wikit-Popover-pointer-margin-vertical;
			}
		}
	}

	&--bottom {
		@include bottom;
		@include horizontal(center);
	}

	&--bottom-end {
		@include bottom;
		@include horizontal(end);
	}

	&--bottom-start {
		@include bottom;
		@include horizontal(start);
	}

	&--top {
		@include top;
		@include horizontal(center);
	}

	&--top-end {
		@include top;
		@include horizontal(end);
	}

	&--top-start {
		@include top;
		@include horizontal(start);
	}

	&--end {
		@include end;
		@include vertical(center);
	}

	&--end-bottom {
		@include end;
		@include vertical(bottom);
	}

	&--end-top {
		@include end;
		@include vertical(top);
	}

	&--start {
		@include start;
		@include vertical(center);
	}

	&--start-bottom {
		@include start;
		@include vertical(bottom);
	}

	&--start-top {
		@include start;
		@include vertical(top);
	}
}
</style>
