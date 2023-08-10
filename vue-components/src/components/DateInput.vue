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
import { defineComponent } from 'vue';
import { errorProp } from '@/compositions/validatable';
import Icon from '@/components/Icon.vue';
import InputWithExtender from '@/components/InputWithExtender.vue';
import BouncingDots from '@/components/BouncingDots.vue';

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
		font-family: $wikit-DateInput-introText-font-family;
		font-weight: $wikit-DateInput-introText-font-weight;
		font-size: $wikit-DateInput-introText-font-size;
		line-height: $wikit-DateInput-introText-line-height;
		color: $wikit-DateInput-introText-color;
	}

	&__ParsedValue {
		padding-block: $wikit-InputExtender-content-padding-vertical;
		font-family: $wikit-DateInput-parsedValue-font-family;
		font-weight: $wikit-DateInput-parsedValue-font-weight;
		font-size: $wikit-DateInput-parsedValue-font-size;
		line-height: $wikit-DateInput-parsedValue-line-height;
		color: $wikit-DateInput-parsedValue-color;
	}

	&__CalendarNotice {
		padding-block-start: $wikit-InputExtender-content-padding-vertical;
		font-family: $wikit-DateInput-calendarNotice-font-family;
		font-weight: $wikit-DateInput-calendarNotice-font-weight;
		font-size: $wikit-DateInput-calendarNotice-font-size;
		line-height: $wikit-DateInput-calendarNotice-line-height;
		color: $wikit-DateInput-calendarNotice-color;
	}

	&__Prompt {
		font-family: $wikit-DateInput-prompt-font-family;
		font-size: $wikit-DateInput-prompt-font-size;
		font-weight: $wikit-DateInput-prompt-font-weight;
		line-height: $wikit-DateInput-prompt-line-height;
		color: $wikit-DateInput-prompt-color;
	}
}
</style>
