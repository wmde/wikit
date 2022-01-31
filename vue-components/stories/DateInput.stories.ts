import DateInput from '@/components/DateInput';
import { Component } from 'vue';

export default {
	component: DateInput,
	title: 'Wikibase Components/DateInput',
};

export function basic( args: { label: string; placeholder: string; disabled: boolean } ): Component {
	return {
		components: { DateInput },
		data(): unknown {
			return {
				value: '',
				parsedValue: '',
			};
		},
		props: Object.keys( args ),
		template: `
          <div>
          <DateInput
              :label="label"
              :placeholder="placeholder"
              :error="error"
              :value="value"
              resultsIntroText="Will be interpreted as:"
              v-model="value"
              :parsedValue="parsedValue"
              :prompt-text="promptText"
              @input="onInput"
              :disabled="disabled"
              style="width: 300px;"
              calendarNotice="All dates are interpreted as Gregorian dates"
          />
          </div>
        `,
		methods: {
			async onInput( value: string ): Promise<void> {
				this.parsedValue = null;
				this.value = value;
				await new Promise( ( r ) => setTimeout( r, 500 ) );
				this.parsedValue = value;
			},
		},
	};
}

basic.args = {
	label: 'Label',
	placeholder: 'Placeholder',
	promptText: 'Please enter a date',
	disabled: false,
	error: null,
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
	promptText: {
		control: {
			type: 'text',
		},
	},
	disabled: {
		control: {
			type: 'boolean',
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
	parsedValue: {
		control: {
			disable: true,
		},
	},
};

export function all(): Component {
	return {
		components: { DateInput },
		data(): unknown {
			return {
				value1: '',
				parsedValue1: '',
				value2: '',
				parsedValue2: '',
				value3: '',
				parsedValue3: '',
			};
		},
		template: `
          <div>
          <DateInput
              label="Label"
              placeholder="Placeholder"
              prompt-text="Please enter a date"
              :value="value1"
              resultsIntroText="Will be interpreted as:"
              v-model="value1"
              :parsedValue="parsedValue1"
              @input="onInput1"
              style="width: 300px;"
              calendarNotice="All dates are interpreted as Gregorian dates"
          />
          <br>
          <DateInput
              label="Label"
              placeholder="Placeholder"
              resultsIntroText="Will be interpreted as:"
              :disabled="true"
              style="width: 300px;"
              calendarNotice="All dates are interpreted as Gregorian dates"
          />
          <br>
          <DateInput
              label="Label"
              placeholder="Placeholder"
              prompt-text="Please enter a date"
              :value="value2"
              resultsIntroText="Will be interpreted as:"
              v-model="value2"
              :parsedValue="parsedValue2"
              :error="{message:'Warning message', type:'warning'}"
              @input="onInput2"
              style="width: 300px;"
              calendarNotice="All dates are interpreted as Gregorian dates"
          />
          <br>
          <DateInput
              label="Label"
              placeholder="Placeholder"
              prompt-text="Please enter a date"
              :value="value3"
              resultsIntroText="Will be interpreted as:"
              v-model="value3"
              :parsedValue="parsedValue3"
              @input="onInput3"
              :error="{message:'Error message', type:'error'}"
              style="width: 300px;"
              calendarNotice="All dates are interpreted as Gregorian dates"
          />
          </div>
        `,
		methods: {
			async onInput1( value: string ): Promise<void> {
				this.parsedValue1 = null;
				this.value1 = value;
				await new Promise( ( r ) => setTimeout( r, 500 ) );
				this.parsedValue1 = value;
			},
			async onInput2( value: string ): Promise<void> {
				this.parsedValue2 = null;
				this.value2 = value;
				await new Promise( ( r ) => setTimeout( r, 500 ) );
				this.parsedValue2 = value;
			},
			async onInput3( value: string ): Promise<void> {
				this.parsedValue3 = null;
				this.value3 = value;
				await new Promise( ( r ) => setTimeout( r, 500 ) );
				this.parsedValue3 = value;
			},
		},
	};
}
