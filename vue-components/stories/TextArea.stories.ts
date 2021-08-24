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
    placeholder: 'Placeholder'
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
        table: {
            defaultValue: {
                summary: 'vertical'
            }
        },
        control: {
            type: 'select',
            options: ['vertical', 'horizontal', 'none'],
            default: 'vertical'
        },
    },
    input : {
        description: 'Emitted on each character input to the textarea, contains the entire string value of the textarea itself.',
        table: {
            type: {
                summary: 'string'
            }
        }
    }
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
