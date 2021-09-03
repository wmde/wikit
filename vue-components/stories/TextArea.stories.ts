import TextArea from '@/components/TextArea';
import { Component } from 'vue';

export default {
	component: TextArea,
	title: 'TextArea',
};

export function basic( args: object ): Component {
    return {
        data(): object {
            return {
                // Binding to the currentValue prevents the value from resetting
                // on the re-render when changing the read-only control from
                // false to true
                currentValue: ''
            };
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
                    :read-only="readOnly"
                    :disabled="disabled"
                    v-model="currentValue"
                />
			</div>
		`,
    };
}

basic.args = {
    label: 'Label',
    placeholder: 'Placeholder',
    resize: 'vertical',
    readOnly: false,
    disabled: false
};

basic.argTypes = {
    value: {
        control: false
    },
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
    readOnly: {
        control: {
            type: 'boolean',
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
        }
    },
    input : {
        description: 'Emitted on each character input to the textarea, contains the entire string value of the textarea itself.',
        table: {
            type: {
                summary: 'string'
            }
        }
    },
    disabled: {
        control: {
            type: 'boolean',
        },
    }
};

export function all(): Component {
    return {
        components: { TextArea },
        template: `
            <div>
                <div style="max-width: 95%;">
                    <TextArea label="Default" placeholder="Placeholder" />
                </div>
                <div style="max-width: 95%; margin-top: 1em;">
                    <TextArea label="Read-only text area" placeholder="Placeholder" :read-only="true" value="Content within a read-only text area can be selected, but it cannot be edited." />
                </div>
                <div style="max-width: 95%; margin-top: 1em;">
                    <TextArea label="Disabled text area" placeholder="Placeholder" :disabled="true" />
                </div>
            </div>
        `,
    };
}
