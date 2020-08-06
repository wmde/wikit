import { mount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe( 'Button', () => {
	it( 'takes arbitrary content in the default slot', () => {
		const content = 'something';
		expect( mount( Button, {
			slots: {
				default: content,
			},
		} ).text() ).toBe( content );
	} );

	it( 'renders the flavor name as a root node class', () => {
		expect( mount( Button, {
			propsData: {
				flavor: 'neutral',
			},
		} ).classes() ).toContain( 'wikit-Button--neutral' );
	} );

	it( 'validates the flavor prop', () => {
		expect( () => mount( Button, {
			propsData: {
				flavor: 'random',
			},
		} ) ).toThrow();
	} );
} );
