<template>
	<transition
		class="wikit"
		name="fade-zoom"
		@before-enter="_trapScroll"
		@after-enter="_trapFocus"
		@enter-cancelled="_restoreScroll"
		@before-leave="_restoreFocus"
		@after-leave="_restoreScroll"
		@leave-cancelled="_trapFocus"
	>
		<div
			:class="[
				'wikit',
				'wikit-Dialog'
			]"
			v-show="open"
			role="dialog"
			aria-modal="true"
			:aria-labelledby="`dialog-title-${uid}`"
		>
			<div class="wikit-Dialog__overlay" @click="dismiss" />
			<div class="wikit-Dialog__modal">
				<header class="wikit-Dialog__header">
					<span :id="`dialog-title-${uid}`" class="wikit-Dialog__title">{{ title }}</span>
					<Button
						v-if="dismissButton"
						ref="closeButton"
						class="wikit-Dialog__close"
						variant="quiet"
						type="neutral"
						aria-label="close"
						icon-only
						@click.native="dismiss"
					>
						<icon type="close" size="medium" />
					</Button>
				</header>
				<section
					:class="[
						'wikit-Dialog__content',
						scrolled ? 'wikit-Dialog__content--scrolled' : ''
					]"
					ref="content"
					@scroll="_handleScroll"
				>
					<slot />
				</section>
				<footer class="wikit-Dialog__footer">
					<Button
						v-for="(action, i) in actions"
						ref="actionButtons"
						:key="i"
						:class="[
							'wikit-Dialog__action',
							action.namespace
						]"
						:variant="i === 0 ? 'primary' : 'normal'"
						:type="i === 0 ? 'progressive' : 'neutral'"
						@click.native="_dispatch(action.namespace)"
					>
						{{ action.label }}
					</Button>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
/* eslint-disable no-underscore-dangle */

import Vue, { PropType } from 'vue';
import throttle from 'lodash/throttle';
import generateUid from '@/components/util/generateUid';

import { ScrollbarDimensions, getScrollbarDimensions, getInteractiveDescendants } from '@/components/util/dom';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

interface DialogAction {
	label: string;
	namespace: string;
}

interface DocumentData {
	cache: {
		activeElement: Element | null;
		overflow: string;
		padding: { x: string; y: string };
	};
	scrollbars: ScrollbarDimensions;
}

interface DialogState {
	document: DocumentData;
	focusable: Element[];
	open: boolean;
	scrolled: boolean;
	uid: string;
}

export default Vue.extend( {
	components: {
		Button,
		Icon,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		/**
		 * An array of action buttons, the first item in  this list will always
		 * appear as a primary button.
		 */
		actions: {
			type: Array as PropType<DialogAction[]>,
			required: true,
		},
		dismissButton: {
			type: Boolean,
			default: false,
		},
		visible: {
			type: Boolean,
			default: false,
		},
	},
	data(): DialogState {
		return {
			focusable: [],
			document: {
				cache: {
					activeElement: null,
					overflow: 'auto',
					padding: { x: 'auto', y: 'auto' },
				},
				scrollbars: {
					width: 0,
					height: 0,
				},
			},
			open: this.visible,
			scrolled: false,
			uid: generateUid( 'wikit-Dialog' ),
		};
	},
	mounted() {
		this.document.scrollbars = getScrollbarDimensions();

		if ( this.visible ) {
			this._trapScroll();
			this.show();
		}
	},
	beforeUpdate() {
		this.focusable = this._collectFocusable();
	},
	beforeDestroy() {
		if ( this.open ) {
			this.hide();
		}
	},
	watch: {
		visible( open: boolean ): void {
			if ( open ) {
				this.show();
			} else {
				this.hide();
			}
		},
	},
	methods: {
		hide(): void {
			document.removeEventListener( 'keydown', this._handleKeydown );
			this.open = false;
			this.$emit( 'update:visible', this.open );
		},
		show(): void {
			document.addEventListener( 'keydown', this._handleKeydown );
			this.open = true;
			this.$emit( 'update:visible', this.open );

			this.$nextTick( this._resetScroll );
		},
		dismiss(): void {
			this.$emit( 'dismissed' );
			this.hide();
		},
		_dispatch( namespace: string ): void {
			this.$emit( 'action', namespace, this );
		},
		_handleKeydown( event: KeyboardEvent ): void {
			switch ( event.key ) {
				case 'Escape':
					this.dismiss();
					break;
				case 'Tab':
					this._cycleFocus( event.shiftKey );
					event.preventDefault();
					break;
			}
		},
		// In the following function we have to annotate `this` as TS doesn't
		// understand the context of higher order functions such as throttle.
		// The actual first argument of the function is `event`
		_handleScroll: throttle( function ( this: DialogState, event: Event ) {
			const target = event.target as HTMLElement;
			this.scrolled = target.scrollTop > 0;
		}, 300 ),
		_collectFocusable(): Element[] {
			const content = this.$refs.content as HTMLElement;
			const actions = ( this.$refs.actionButtons || [] ) as Vue[];
			const dismiss = this.$refs.closeButton as Vue;

			const focusable = getInteractiveDescendants( content );

			const buttonElements = [
				...actions.map( ( component ) => component.$el ),
			];

			if ( dismiss ) {
				buttonElements.push( dismiss.$el );
			}

			return [
				...focusable,
				...buttonElements,
			];
		},
		_cycleFocus( shifted: boolean ): void {
			const focusable = this.focusable;
			const active = document.activeElement;
			const indices = {
				current: active ? focusable.indexOf( active ) : 0,
				offset: shifted ? -1 : 1,
				last: focusable.length - 1,
				next() { return this.current + this.offset; },
			};

			if ( indices.next() > indices.last ) {
				( focusable[ 0 ] as HTMLElement ).focus();

				return;
			}

			if ( indices.next() < 0 ) {
				( focusable[ indices.last ] as HTMLElement ).focus();

				return;
			}

			( focusable[ indices.next() ] as HTMLElement ).focus();
		},
		_trapFocus(): void {
			const content = this.$refs.content as HTMLElement;
			const target: HTMLElement = content.querySelector( '[autofocus]' ) ?? content;

			this.document.cache.activeElement = document.activeElement;
			if ( target !== null ) {
				target.focus();
			}
		},
		_trapScroll(): void {
			const root = document.documentElement;
			const documentStyles = window.getComputedStyle( root );

			this.document.cache.overflow = documentStyles.overflow;
			this.document.cache.padding = {
				x: documentStyles.paddingInlineEnd,
				y: documentStyles.paddingBlockEnd,
			};

			root.style.overflow = 'hidden';

			if ( root.scrollHeight > root.clientHeight ) {
				root.style.paddingInlineEnd = `${this.document.scrollbars.width}px`;
			}

			if ( root.scrollWidth > root.clientWidth ) {
				root.style.paddingBlockEnd = `${this.document.scrollbars.height}px`;
			}
		},
		_resetScroll(): void {
			( this.$refs.content as HTMLElement ).scrollTop = 0;
			this.scrolled = false;
		},
		_restoreFocus(): void {
			const lastFocused = this.document.cache.activeElement as HTMLElement;

			if ( lastFocused !== null ) {
				lastFocused.focus( { preventScroll: true } );
			}
		},
		_restoreScroll(): void {
			const { overflow, padding } = this.document.cache;

			document.documentElement.style.overflow = overflow;
			document.documentElement.style.paddingInlineEnd = padding.x;
			document.documentElement.style.paddingBlockEnd = padding.y;
		},
	},
} );
</script>

<style lang="scss">
	@import '~@wmde/wikit-tokens/dist/_variables.scss';
	$base: '.wikit-Dialog';

	// This token was missed, and will be fixed in WiKit.
	// TODO: Replace this with the fixed component token when porting to WiKit
	$wikit-Dialog-border-color: $border-color-base-subtle;

	#{$base} {
		/**
		* Layout
		*/
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
	}

	#{$base}__overlay {
		/**
		* Layout
		*/
		width: $wikit-Dialog-overlay-width;
		height: $wikit-Dialog-overlay-height;
		position: absolute;
		top: 0;
		left: 0;

		/**
		* Colors
		*/
		background-color: $wikit-Dialog-overlay-background-color;
		opacity: $wikit-Dialog-overlay-opacity;
	}

	#{$base}__modal {
		/**
		* Layout
		*/
		display: flex;
		flex-direction: column;

		width: $wikit-Dialog-width-complex;
		max-width: 75%;
		max-height: 90%;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		/**
		* Colors
		*/
		color: $wikit-Dialog-body-color;
		background-color: $wikit-Dialog-background-color;

		/**
		* Typography
		*/
		font-family: $wikit-Dialog-body-font-family;
		font-size: $wikit-Dialog-body-font-size;
		font-weight: $wikit-Dialog-body-font-weight;
		line-height: $wikit-Dialog-body-line-height;

		/**
		* Borders
		*/
		border-color: $wikit-Dialog-border-color;
		border-style: $wikit-Dialog-border-style;
		border-width: $wikit-Dialog-border-width;
		border-radius: $wikit-Dialog-border-radius;
		box-shadow: $wikit-Dialog-elevation;
	}

	#{$base}__header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;

		color: $wikit-Dialog-header-color;

		padding-block-start: $wikit-Dialog-header-spacing-top;
		padding-block-end: $wikit-Dialog-header-spacing-bottom-complex;
		padding-inline-start: $wikit-Dialog-header-spacing-left;
		padding-inline-end: $wikit-Dialog-header-spacing-right;

		#{$base}__title {
			font-family: $wikit-Dialog-header-font-family;
			font-size: $wikit-Dialog-header-font-size;
			font-weight: $wikit-Dialog-header-font-weight;
			line-height: $wikit-Dialog-header-line-height;
		}

		#{$base}__close.wikit.wikit-Button.wikit-Button--iconOnly {
			line-height: 0;
		}
	}

	#{$base}__content {
		overflow-y: auto;
		padding-block-start: $wikit-Dialog-body-spacing-top-complex;
		padding-block-end: $wikit-Dialog-body-spacing-bottom-complex;
		padding-inline-start: $wikit-Dialog-body-spacing-left;
		padding-inline-end: $wikit-Dialog-body-spacing-left;

		&--scrolled {
			// This token was actually supposed to go on the header but was
			// included here due to a token value mistake which will be fixed
			// in WiKit.
			// TODO: After porting to wikit move this to `#{$base}__header`
			box-shadow: $wikit-Dialog-header-box-shadow;
		}
	}

	#{$base}__footer {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;

		box-shadow: $wikit-Dialog-footer-box-shadow;

		padding-block-start: $wikit-Dialog-footer-spacing-top-complex;
		padding-inline-start: $wikit-Dialog-footer-spacing-left;
		padding-inline-end: $wikit-Dialog-footer-spacing-left;

		#{$base}__action {
			margin-block-end: $wikit-Dialog-footer-spacing-bottom-complex;
			margin-inline-start: $wikit-Dialog-footer-spacing;
		}
	}

	/**
	* Animations
	*/
	.fade-zoom-enter-active,
	.fade-zoom-leave-active {
		// A default transition duration needs to be added, in order to allow
		// vue to add the crrect classes
		transition-duration: $wikit-Dialog-transition-duration;

		#{$base}__overlay {
			transition-property: opacity;
			transition-duration: $wikit-Dialog-overlay-transition-duration;
		}

		#{$base}__modal {
			transition-property: opacity, transform;
			transition-duration: $wikit-Dialog-transition-duration;
		}
	}

	.fade-zoom-enter,
	.fade-zoom-leave-to {
		#{$base}__overlay {
			opacity: 0;
		}

		#{$base}__modal {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.7);
		}
	}
</style>
