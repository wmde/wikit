import WikitLink from '@/components/Link';
import { Component } from 'vue';

export default {
	component: WikitLink,
	// the `/` prefix in the title is needed for "Message" to appear as a folded navigation item, and not a headline
	title: '/Link',
};

export function basic( args: { content: string; underlined: boolean } ): Component {
	return {
		data(): object {
			return { args };
		},
		components: { WikitLink },
		props: Object.keys( args ),
		template: `
			<div>
			<p><WikitLink
                :underlined="underlined"
                :href="'#' + Math.random()"
            ><span v-html="content" /></WikitLink></p>
			</div>
		`,
	};
}

basic.args = {
	underlined: false,
	content: 'Controllable link',
};

basic.argTypes = {
	underlined: {
		control: {
			type: 'boolean',
		},
	},
	content: {
		control: {
			type: 'text',
		},
	},
};

export function all(): Component {
	return {
		components: { WikitLink },
		template: `
			<div>
            <p><WikitLink :href="'#' + Math.random()">Click here</WikitLink></p>
            <p><WikitLink :href="'#' + Math.random()" underlined>Click here</WikitLink></p>
            <p><WikitLink :href="'#' + Math.random()" icon="before">About Wikidata</WikitLink></p>
            <p><WikitLink :href="'#' + Math.random()" icon="after">About Wikidata</WikitLink></p>
            </div>
		`,
	};
}
all.parameters = {
	controls: { hideNoControlsWarning: true },
};
