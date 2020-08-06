import Button from '../src/components/Button';
import { boolean, text } from '@storybook/addon-knobs';

export default {
	component: Button,
	title: 'Button',
};

export function normal() {
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
