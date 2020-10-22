import Message from '@/components/Message';
import { Component } from 'vue';

export default {
	component: Message,
	// the `/` prefix in the title is needed for "Message" to appear as a folded navigation item, and not a headline
	title: '/Message/Message',
};

export function all(): Component {
	return {
		components: { Message },
		template: `
			<div>
				<p><Message type="error">An <b>error</b> which means it's potentially stopping whatever the user just did and providing them a clear message on what's wrong. There's also <a href="https://example.com">an explanatory link</a>.</Message></p>
				<p><Message type="warning">A warning which is not stopping whatever the user just did, but needs to clear up why things might not work as expected.</Message></p>
				<p><Message type="notice">A neutral message which inform about general higher priority notices to the user. Stay neutral!</Message></p>
				<p><Message type="success">A success message which means that the user did everything right and should know about it. Yay!</Message></p>
				<p><Message fullwidth="true" type="success">A success message which means that the user did everything right and should know about it. Yay!</Message></p>
			</div>
		`,
	};
}


export function controllableMessage( args: { fullwidth: boolean, content: string, type: string } ): Component {
	return {
		data(): object {
			return { args };
		},
		components: { Message },
		props: Object.keys( args ),
		template: `
			<div>
			<p><Message :fullwidth="fullwidth" :type="type"><span v-html="content" /></Message></p>
			</div>
		`,
	};
}

controllableMessage.args = {
	type: 'success',
	fullwidth: false,
	content: 'Here is some <em>content</em>. You can modify it in the "Controls" section.',
};

controllableMessage.argTypes = {
	type: {
		control: {
			type: 'inline-radio',
			options: [ 'warning', 'error', 'notice', 'success' ],
		},
	},
	content: {
		control: {
			type: 'text',
		}
	},
};
