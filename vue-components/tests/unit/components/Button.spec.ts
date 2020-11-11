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
	] )( 'renders the flavor %s as a root node class', ( flavor ) => {
		expect( mount( Button, {
			propsData: {
				flavor,
			},
		} ).classes() ).toContain( `wikit-Button--${flavor}` );
	} );

	it( 'validates the flavor prop', () => {
		expect( () => mount( Button, {
			propsData: {
				flavor: 'random',
			},
		} ) ).toThrow();
	} );
} );
