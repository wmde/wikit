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
			<div style="height: 70vh;">
				<Button 
					@click.native="$refs.simple.show()" 
					variant="primary" type="progressive"
				>
					Open complex dialog
				</Button>
				<Dialog
					:title="title"
					ref="simple"
					:actions="actions"
					@action="(_, dialog) => dialog.hide()"
					:dismiss-button="dismissButton"
					:visible="visible"
				>
					{{ content }}
				</Dialog>
			</div>
		`,
	};
}

complex.args = {
	title: 'Complex dialog',
	dismissButton: true,
	actions: [
		{
			label: 'Primary action',
			namespace: 'close'
		},
		{
			label: 'Secondary action',
			namespace: 'secondary'
		}
	],
	visible: true,
	content: `Complex dialogs can display extensive information and contain all kinds of interactive elements
	(such as inputs, tables, tabs, lists) that may allow users to submit and edit information.

	
	Dialogs can display up to two action buttons, the secondary action being optional.`
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
        table: {
            type: {
                summary: 'array',
            },
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