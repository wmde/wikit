import Button from '@/components/Button';
import { boolean, text, select } from '@storybook/addon-knobs';
import { Component } from 'vue';

export default {
	component: Button,
	title: 'Button',
};

export function normal(): Component {
	return {
		components: { Button },
		props: {
			content: {
				default: text( 'Message', 'Everything normal' ),
			},
			disabled: {
				default: boolean( 'disabled', false ),
			},
			// naming a prop the same way the component's prop is named leads to
			// a broken state where the property value is not passed to the component
			// this happens with vue-cli v4.4.0 and storybook v6.0.0-rc.24
			buttonType: {
				default: select( 'Type', [ 'neutral', 'progressive' ], 'neutral' ),
			},
		},
		template: '<Button v-html="content" :disabled="disabled" :type="buttonType" />',
	};
}
