import TextArea from '@/components/TextArea';
import { Component } from 'vue';

export default {
	component: TextArea,
	title: 'TextArea',
};

export function basic( args: object ): Component {
    return {
        data(): object {
            return { args };
        },
        components: { TextArea },
        props: Object.keys( args ),
        template: `
			<div style="max-width: 75%">
				<TextArea 
                    :label="label"
                    :placeholder="placeholder"
                    :rows="rows"
                    :resize="resize"
                />
			</div>
		`,
    };
}

basic.args = {
    label: 'Label',
    placeholder: 'Placeholder',
    resize: 'vertical' 
};

basic.argTypes = {
    label: {
        control: {
            type: 'text',
        },
    },
    placeholder: {
        control: {
            type: 'text',
        },
    },
    rows: {
        control: {
            type: 'number',
        },
    },
    resize: {
        control: {
            type: 'select',
            options: ['vertical', 'horizontal', 'none'],
            default: 'vertical'
        },
    },
};

export function all(): Component {
	return {
		components: { TextArea },
		template: `
			<div style="max-width: 95%">
				<TextArea label="Label" placeholder="Placeholder" />
			</div>
		`,
	};
}
