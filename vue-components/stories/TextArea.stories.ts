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
                    :loading="loading"
                    :error="validation"
                    v-model="currentValue"
                />
			</div>
		`,
        computed: {
            validation(): string {
                // To enable preview of validation states, we add this computed
                // property and bind it to the component's error prop
                const mapping = {
                    'none': null,
                    'warning': {
                        type: 'warning',
                        message: 'This is a warning message'
                    },
                    'error': {
                        type: 'error',
                        message: 'This is an error message'
                    }
                }

                return mapping[this.error];
            },
        }
    };
}

basic.args = {
    label: 'Label',
    placeholder: 'Placeholder',
    resize: 'vertical',
    readOnly: false,
    loading: false,
    error: 'none'
};

basic.argTypes = {
    value: {
        control: false
    },
    error: {
        control: {
            type: 'select',
            options: ['none', 'warning', 'error'],
            default: 'none'
        },
        table: {
            type: {
                summary: 'object'
            }
        }
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
    loading: {
        control: {
            type: 'boolean',
        }
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
            <div>
                <div style="max-width: 95%;">
                    <TextArea label="Default" placeholder="Placeholder" />
                </div>
                <div style="max-width: 95%; margin-top: 1em;">
                    <TextArea label="Read Only" placeholder="Placeholder" :read-only="true" value="Content within a read-only text area can be selected, but it cannot be edited." />
                </div>
                <div style="max-width: 95%; margin-top: 1em;">
                    <TextArea label="Loading" placeholder="Placeholder" :loading="true" value="When the text area is set to loading, an indeterminate progress bar will appear." />
                </div>
                <div style="max-width: 95%; margin-top: 1em;">
                    <TextArea label="Warning" :error="{ type: 'warning', message: 'Warnings should appear underneath the text area, as long as they are passed to the component.' }" value="To set a warning message for the text area, pass an object with the type: 'warning' along with a message to the 'error' prop." />
                </div>
                <div style="max-width: 95%; margin-top: 1em;">
                    <TextArea label="Warning" :error="{ type: 'error', message: 'Errors should appear underneath the text area, as long as they are passed to the component.' }" value="To set an error message for the text area, pass an object with the type: 'error' along with a message to the 'error' prop." />
                </div>
            </div>
        `,
    };
}
