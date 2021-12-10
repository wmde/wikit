import { InputWithExtender } from '@/main';
import { Component } from 'vue';

export default {
	component: InputWithExtender,
	// the `/` prefix in the title is needed for "Input" to appear as a folded navigation item, and not a headline
	title: '/Input/InputWithExtender',
};

export function basic( args: { content: string; underlined: boolean } ): Component {
	return {
		data(): object {
			return { args };
		},
		components: { InputWithExtender },
		props: Object.keys( args ),
		template: `
			<div>
				<InputWithExtender :label="label" :disabled="disabled" placeholder="Placeholder" style="width: 300px;">
                  <div>
                    This is the extender menu. Any text or component can be included here.
                  </div>
                </InputWithExtender>
			</div>
		`,
	};
}

basic.args = {
	label: 'Label',
	disabled: false,
};

basic.argTypes = {
	disabled: {
		control: {
			type: 'boolean',
		},
	},
	label: {
		control: {
			type: 'text',
		},
	},
};
export function all(): Component {
	return {
		components: { InputWithExtender },
		props: {
			style: {
				type: String,
				default: 'font-family: sans-serif; font-style: normal; font-weight: normal; font-size: 16px; line-height: 20px; color: #72777D;',
			},
		},
		template: `
			<div>
            <InputWithExtender label="Label" placeholder="Placeholder" style="width: 300px;">
              <div :style="style">
                Menu content placeholder. Any text or component can be displayed here.
              </div>
            </InputWithExtender>
            <br>
            <InputWithExtender
                label="Label"
                disabled="disabled"
                placeholder="Placeholder"
                style="width: 300px;"
            >
              <div :style="style">
                Menu content placeholder. Any text or component can be displayed here.
              </div>
            </InputWithExtender>
            <br>
            <InputWithExtender
                label="label"
                :error="{message:'Warning message', type:'warning'}"
                placeholder="Placeholder"
                style="width: 300px;"
            >
              <div :style="style">
                Menu content placeholder. Any text or component can be displayed here.
              </div>
            </InputWithExtender>
            <br>
            <InputWithExtender
                label="Label"
                :error="{message:'Error message', type:'error'}"
                placeholder="Placeholder"
                style="width: 300px;"
            >
              <div :style="style">
                Menu content placeholder. Any text or component can be displayed here.
              </div>
            </InputWithExtender>
            </div>
		`,
	};
}
all.parameters = {
	controls: { hideNoControlsWarning: true },
};
