import Link from '@/components/Link';
import { Component } from 'vue';

export default {
    component: Link,
    // the `/` prefix in the title is needed for "Message" to appear as a folded navigation item, and not a headline
    title: '/Link',
};

export function basic( args: { content: string; underlined: boolean } ): Component {
    return {
        data(): object {
            return { args };
        },
        components: { Link },
        props: Object.keys( args ),
        template: `
			<div>
			<p><Link
                :underlined="underlined"
                :href="'#' + Math.random()"
            ><span v-html="content" /></Link></p>
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
        components: { Link },
        template: `
			<div>
            <p><Link :href="'#' + Math.random()">Click here</Link></p>
            <p><Link :href="'#' + Math.random()" underlined>Click here</Link></p>
            <p><Link :href="'#' + Math.random()" icon="before">About Wikidata</Link></p>
            <p><Link :href="'#' + Math.random()" icon="after">About Wikidata</Link></p>
            </div>
		`,
    };
}
all.parameters = {
    controls: { hideNoControlsWarning: true },
};
