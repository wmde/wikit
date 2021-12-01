import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import { Component } from 'vue';

export default {
	component: Dialog,
	title: '/Dialog',
};

export function complex( args: { title: string, actions: string, dismissButton: boolean, visible: boolean, dialogText }): Component {
	return {
		components: { Button, Dialog },
		props: Object.keys( args ),
		template: `
			<div>
				<Button 
					@click.native="$refs.simple.show()" 
					variant="primary" type="progressive"
				>
					Open Basic Dialog
				</Button>
				<Dialog
					:title="title"
					ref="simple"
					:actions="actions"
					style="transform: translate(50%, 50%)"
					@action="(_, dialog) => dialog.hide()"
					:dismiss-button="dismissButton"
					:visible="visible"
				>
					<p style="margin-bottom:10px">Hello, I am a simple dialog</p>
					{{ dialogText }}
				</Dialog>
			</div>
		`,
	};
}

complex.args = {
	title: 'I am a complex dialog',
	dismissButton: 'true',
	actions: [
		{
			label: 'Close me',
			namespace: 'close'
		},
		{
			label: 'Secondary action',
			namespace: 'secondary'
		}
	],
	visible: true,
	dialogText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
		Fusce imperdiet metus eget ipsum euismod, non dictum velit 
		consequat. Curabitur sit amet neque vitae eros placerat luct
		us. Aenean sagittis, libero sed lacinia sollicitudin,

		Vestibulum vitae tortor ac ipsum blandit vulputate.
		Suspendisse eget nisi tortor. Vestibulum non odio pharetra`
};

complex.argTypes = {
    title: {
        control: {
            type: 'text',
        },
    },
	actions: {
        control: {
            type: 'object',
        },
    },
	dismissButton: {
        control: {
            type: 'boolean',
        },
    },
	visible: {
        control: {
            type: 'boolean',
        },
    },
};