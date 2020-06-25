import { storiesOf } from '@storybook/vue';
import ResizingTextField from '@/components/ResizingTextField.vue';

storiesOf( 'ResizingTextField', module )
	.addParameters( {
		component: ResizingTextField,
		docs: {
			extractComponentDescription: () => {
				// eslint-disable-next-line
				return 'Please note this case shows just the plain version of the component and has to be styled by its parent.';
			},
		},
	} )
	.add( 'plain', () => ( {
		data: () => ( { value: 'value' } ),
		components: { ResizingTextField },
		template: '<ResizingTextField v-model="value" />',
	} ) )
	.add( 'full-width', () => ( {
		data: () => ( {
			value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
				'Nullam eu viverra ante. Sed eget quam mi. Duis at turpis eget odio cursus tincidunt. ' +
				'Donec blandit lorem vel eros ullamcorper laoreet. ' +
				'Pellentesque in dignissim nisl. ' +
				'Fusce pharetra, magna quis aliquet pellentesque, ' +
				'enim mi laoreet sapien, fermentum blandit magna metus sed lacus.',
		} ),
		components: { ResizingTextField },
		template:
			`<div>
				<p>
					This input occupies the full width of the surrounding window, minus some margin.
					Use the “open canvas in new tab” button to view just this story,
					then resize the window and see how the height of the text field adjusts itself automatically.
				</p>
				<ResizingTextField v-model="value" style="width: 100%" />
			</div>`,
	} ) );
