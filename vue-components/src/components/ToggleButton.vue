<template>
	<button
		:class="['wikit', 'wikit-ToggleButton', buttonIsActive ? 'wikit-ToggleButton--isActive' : null]"
		@click="onClick"
	>
		<slot />
	</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'ToggleButton',
	methods: {
		onClick(): void {
			if ( this.toggleListener !== null ) {
				this.toggleListener( this.value );
			}
			this.$emit( 'click', this.value );
		},
	},
	inject: {
		groupValue: { default: null },
		toggleListener: { default: null },
	},
	computed: {
		buttonIsActive(): boolean {
			if ( this.groupValue !== null ) {
				return this.groupValue() === this.value;
			}
			return this.isActive;
		},
	},
	props: {
		listener: {
			type: Function,
			default: null,
		},
		value: {
			required: true,
			type: String,
		},
		isActive: {
			default: false,
			type: Boolean,
		},
	},
} );
</script>

<style lang="scss">
.wikit-ToggleButton {
	color: $wikit-ToggleButton-color;
	font-family: $wikit-ToggleButton-font-family;
	font-weight: $wikit-ToggleButton-font-weight;
	font-size: $wikit-ToggleButton-font-size;
	line-height: $wikit-ToggleButton-line-height;
	border-width: $wikit-ToggleButton-border-width;
	border-style: $wikit-ToggleButton-border-style;
	border-radius: $wikit-ToggleButton-border-radius;
	border-color: $wikit-ToggleButton-border-color;
	background-color: $wikit-ToggleButton-background-color;
	padding-inline: $wikit-ToggleButton-medium-padding-horizontal;
	padding-block: $wikit-ToggleButton-medium-padding-vertical;
	transition-property: $wikit-ToggleButton-transition-property;
	transition-duration: $wikit-ToggleButton-transition-duration;
	transition-timing-function: $wikit-ToggleButton-transition-timing-function;

	&:hover {
		color: $wikit-ToggleButton-hover-color;
		border-color: $wikit-ToggleButton-hover-border-color;
		background-color: $wikit-ToggleButton-hover-background-color;
	}

	&:active {
		color: $wikit-ToggleButton-active-color;
		border-color: $wikit-ToggleButton-active-border-color;
		background-color: $wikit-ToggleButton-active-background-color;
	}

	&:focus {
		color: $wikit-ToggleButton-focus-color;
		border-color: $wikit-ToggleButton-focus-border-color;
		background-color: $wikit-ToggleButton-focus-background-color;
		box-shadow: $wikit-ToggleButton-focus-box-shadow;
	}
}

.wikit-ToggleButton.wikit-ToggleButton--isActive {
	color: $wikit-ToggleButton-selected-color;
	border-color: $wikit-ToggleButton-selected-border-color;
	background-color: $wikit-ToggleButton-selected-background-color;

	&:focus {
		box-shadow: $wikit-ToggleButton-selected-focus-box-shadow;
	}
}

</style>
