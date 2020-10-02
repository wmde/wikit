import { mount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';
import Icon from '@/components/Icon.vue';

describe( 'TextInput', () => {

	it( 'takes text input', () => {
		const content = 'a value';
		const wrapper = mount( TextInput, {
			propsData: {
				value: content,
			},
		} );
		const inputElement = wrapper.find( 'input' );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( content );
	} );

	it( 'emits an input event on user input', () => {
		const userInput = 'hello';
		const wrapper = mount( TextInput );

		wrapper.find( 'input' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ userInput ] );
	} );

	it( 'has a label', () => {
		const label = 'a label';
		const wrapper = mount( TextInput, {
			propsData: {
				label,
			},
		} );

		expect( wrapper.find( '.wikit-TextInput__label' ).text() ).toBe( label );
	} );

	it( 'can be disabled', () => {
		const wrapper = mount( TextInput, {
			propsData: {
				disabled: true,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBeTruthy();
	} );

	it( 'can have a placeholder', () => {
		const placeholder = 'a placeholder';
		const wrapper = mount( TextInput, {
			propsData: {
				placeholder,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'rejects invalid width props', () => {
		expect( () => mount( TextInput, {
			propsData: {
				width: 'not-a-valid-width',
			},
		} ) ).toThrow();
	} );

	it.each( [
		'small',
		'medium',
		'large',
		'full-width',
	] )( 'renders the width %s as a root node class', ( width ) => {
		expect( mount( TextInput, {
			propsData: {
				width,
			},
		} ).classes() ).toContain( `wikit-TextInput--${width}` );
	} );

	it( 'rejects errors without a message', () => {
		expect( () => mount( TextInput, {
			propsData: {
				error: {
					type: 'warning',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects errors without a type', () => {
		expect( () => mount( TextInput, {
			propsData: {
				error: {
					message: 'things went wrong',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects invalid error types', () => {
		expect( () => mount( TextInput, {
			propsData: {
				error: {
					type: 'not-that-bad',
				},
			},
		} ) ).toThrow();
	} );

	it.each( [
		'warning',
		'error',
	] )( 'renders the error message as a root node class', ( errorType ) => {
		const errorMessage = 'error!!!!';
		const wrapper = mount( TextInput, {
			propsData: {
				error: {
					type: errorType,
					message: errorMessage,
				},
			},
		} );

		expect( wrapper.classes() ).toContain( `wikit-TextInput--${errorType}` );
		expect( wrapper.find( '.wikit-TextInput__error-message' ).text() ).toBe( errorMessage );
	} );

	it.each( [
		[ 'warning', 'alert' ],
		[ 'error', 'error' ],
	] )( 'renders the error message as a root node class', ( errorType, expectedIcon ) => {
		const wrapper = mount( TextInput, {
			propsData: {
				error: {
					type: errorType,
					message: 'things went wrong',
				},
			},
		} );

		expect( wrapper.findComponent( Icon ).props( 'type' ) ).toBe( expectedIcon );
	} );

} );
