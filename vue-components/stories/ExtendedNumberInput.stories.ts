import ExtendedNumberInput from '@/components/ExtendedNumberInput';
import { Component } from 'vue';
import {ErrorProp} from "../dist/compositions/validatable";

export default {
    component: ExtendedNumberInput,
    title: 'Wikibase Components/ExtendedNumberInput',
};

export function basic( args: { label: string, placeholder: string } ): Component {
    return {
        components: { ExtendedNumberInput },
        data(): unknown {
            return {
                error: null as ErrorProp|null,
                value: ''
            };
        },
        props: Object.keys( args ),
        template: `
          <div>
          <p><ExtendedNumberInput
              :label="label"
              :placeholder="placeholder"
              :error="error"
              v-model="value"
              @input="() => error = null"
              @invalid-input="() => error = {type: 'error', message: 'bad value'}"
          /></p>
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
    error: {
        control: {
            disable: true,
        },
    },
    value: {
        control: {
            disable: true,
        },
    },
    disabled: {
        control: {
            disable: true,
        },
    },
};

export function all(): Component {
    return {
        components: { ExtendedNumberInput },
        template: `
			<div>
				<p><ExtendedNumberInput label="Label" placeholder="Placeholder" /></p>
				<p><ExtendedNumberInput label="Label" disabled="disabled" placeholder="Placeholder" /></p>
				<p><ExtendedNumberInput label="Label" :error="{ type: 'error', message: 'Inline error message' }" placeholder="Placeholder" /></p>
				<p><ExtendedNumberInput label="Label" :error="{ type: 'warning', message: 'Warning message' }" placeholder="Placeholder" /></p>
			</div>
		`,
    };
}
