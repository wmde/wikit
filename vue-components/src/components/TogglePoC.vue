<template>
	<span :class="['wikit', 'wikit-TogglePoC', options.length > 1 ? 'multipleButtons' : null]">
		<span class="option" v-for="option in options" :key="option.value">
			<input
				class="option-input"
				@change="change"
				:type="options.length === 1 ? 'checkbox' : 'radio'"
				:id="id + option.value"
				:checked="option.value === value"
				:name="id"
				:value="option.value"
			><label class="option-label" :for="id + option.value">{{ option.label }}</label>
		</span>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';
import generateUid from '@/components/util/generateUid';

export default Vue.extend( {
	name: 'TogglePoC', // Name idea: ButtonToggle
	props: {
		options: { // option.value needs to be unique!
			required: true,
			type: Array,
		},
		value: {
			required: true,
			type: String,
		},
	},
	data() {
		return {
			// https://github.com/vuejs/vue/issues/5886
			id: generateUid( 'wikit-TextInput' ),
		};
	},
	methods: {
		change( event: InputEvent ): void {
			this.$emit( 'input', event.target.value );
		},
	},
} );
</script>

<style lang="scss">

.option-label {
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

	//FIXME: add large padding in media query
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

}

.option-input {
	width: 0;
	height: 0;
	opacity: 0;
	inset-inline-start: 0;/* we move it out of our way */
	position: absolute;

	// IMPORTANT: :focus has to come before :checked!
	&:focus + .option-label {
		color: $wikit-ToggleButton-focus-color;
		border-color: $wikit-ToggleButton-focus-border-color;
		background-color: $wikit-ToggleButton-focus-background-color;
		box-shadow: $wikit-ToggleButton-focus-box-shadow;
	}

	&:checked + .option-label {
		color: $wikit-ToggleButton-selected-color;
		border-color: $wikit-ToggleButton-selected-border-color;
		background-color: $wikit-ToggleButton-selected-background-color;
	}

	&:checked:focus + .option-label {
		box-shadow: $wikit-ToggleButton-selected-focus-box-shadow;
	}
}

.multipleButtons {
	@include ButtonGroup('.option-label');
}
</style>
