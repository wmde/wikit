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

	it.each( [
		'neutral',
		'primaryProgressive',
		'primaryDestructive',
	] )( 'renders the type %s as a root node class', ( type ) => {
		expect( mount( Button, {
			propsData: {
				type,
			},
		} ).classes() ).toContain( `wikit-Button--${type}` );
	} );

	it( 'validates the type prop', () => {
		expect( () => mount( Button, {
			propsData: {
				type: 'random',
			},
		} ) ).toThrow();
	} );
} );
