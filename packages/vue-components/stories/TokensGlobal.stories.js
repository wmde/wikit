import { storiesOf } from '@storybook/vue';
import RadioInput from '@/components/RadioInput.vue';
import { WmfWidthBreakpointMobile } from '@wmde/wikit-tokens/dist/index';

storiesOf( 'tokens/global', module )
	.addParameters( { component: RadioInput } )
	.add( 'default', () => ( {
		components: { RadioInput },
		template:
			`<ul>
				<li>WmfWidthBreakpointMobile: ${WmfWidthBreakpointMobile}</li>
			</ul>`,
	} ) );
