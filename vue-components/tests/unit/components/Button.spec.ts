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
		[ 'normal', 'neutral' ],
		[ 'primary', 'progressive' ],
		[ 'primary', 'destructive' ],
		[ 'quiet', 'neutral' ],
		[ 'quiet', 'progressive' ],
		[ 'quiet', 'destructive' ],
	] )( 'renders the variant %s and type %s as a root node classes', ( variant, type ) => {
		expect( mount( Button, {
			props: {
				variant,
				type,
			},
		} ).classes() ).toContain( `wikit-Button--${type}` );
	} );

	it( 'validates the type prop', () => {
		expect( () => mount( Button, {
			props: {
				type: 'random',
			},
		} ) ).toThrow();
	} );

	it( 'validates the variant prop', () => {
		expect( () => mount( Button, {
			props: {
				variant: 'random',
			},
		} ) ).toThrow();
	} );

	it( 'throws for invalid combinations', () => {
		expect( () => mount( Button, {
			props: {
				variant: 'primary',
				type: 'neutral',
			},
		} ) ).toThrow();
	} );

	it( 'validates the native type prop', () => {
		expect( () => mount( Button, {
			props: {
				nativeType: 'random',
			},
		} ) ).toThrow();
	} );
} );
