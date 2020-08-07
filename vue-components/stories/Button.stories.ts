import Button from '@/components/Button';
import { boolean, text } from '@storybook/addon-knobs';
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
			}
		},
		template: `<Button v-html="content" :disabled="disabled" />`,
	}
}
