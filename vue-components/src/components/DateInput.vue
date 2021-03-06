<template>
	<div
		:class="[ 'wikit', 'wikit-DateInput' ]"
	>
		<InputWithExtender
			:label="label"
			:value="value"
			:error="error"
			:placeholder="placeholder"
			:disabled="disabled"
			@input="$emit( 'input', $event )"
		>
			<template v-slot:default>
				<p class="wikit-DateInput__IntroText">
					{{ resultsIntroText }}
				</p>
				<p class="wikit-DateInput__ParsedValue" v-if="parsedValue">
					<b>{{ parsedValue }}</b>
				</p>
				<p class="wikit-DateInput__Prompt" v-if="promptText && !value">
					{{ promptText }}
				</p>
				<BouncingDots v-if="!parsedValue && value" type="small" />
				<div class="wikit-DateInput__CalendarNotice" v-if="calendarNotice && parsedValue">
					<Icon color="inherit" type="info" size="small" />
					{{ calendarNotice }}
				</div>
			</template>
			<template v-slot:suffix>
				<slot name="suffix" />
			</template>
		</InputWithExtender>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueCompositionAPI, { defineComponent } from '@vue/composition-api';
import { errorProp } from '@/compositions/validatable';
import Icon from '@/components/Icon.vue';
import InputWithExtender from '@/components/InputWithExtender.vue';
import BouncingDots from '@/components/BouncingDots.vue';

Vue.use( VueCompositionAPI );

export default defineComponent( {
	name: 'DateInput',
	components: {
		BouncingDots,
		Icon,
		InputWithExtender,
	},
	props: {
		error: errorProp,
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: null,
		},
		parsedValue: {
			type: String,
			default: null,
		},
		resultsIntroText: {
			type: String,
			default: null,
		},
		promptText: {
			type: String,
			default: null,
		},
		value: {
			type: String,
			default: null,
		},
		calendarNotice: {
			type: String,
			default: null,
		},
	},
} );
</script>

<style lang="scss">
.wikit-DateInput {
	&__IntroText {
		padding-block-end: $wikit-InputExtender-content-padding-vertical;
		font-family: $font-family-style-label;
		font-weight: $font-weight-style-label;
		font-size: $font-size-style-label;
		line-height: $font-line-height-style-label;
		color: $font-color-base;
	}

	&__ParsedValue {
		padding-block: $wikit-InputExtender-content-padding-vertical;
		font-family: $font-family-style-label;
		font-weight: $font-weight-bold;
		font-size: $font-size-style-label;
		line-height: $font-line-height-style-label;
		color: $font-color-base;
	}

	&__CalendarNotice {
		padding-block-start: $wikit-InputExtender-content-padding-vertical;
		font-family: $font-family-style-description;
		font-weight: $font-weight-style-description;
		font-size: $font-size-style-description;
		line-height: $font-line-height-style-description;
		color: $font-color-subtle;
	}

	&__Prompt {
		font-family: $font-family-style-placeholder;
		font-size: $font-size-style-placeholder;
		font-weight: $font-weight-style-placeholder;
		line-height: $font-line-height-style-placeholder;
		color: $font-color-subtle;
	}
}
</style>
