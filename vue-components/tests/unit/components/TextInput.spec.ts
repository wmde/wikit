import { mount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';

describe( 'TextInput', () => {

	it( 'takes text input', () => {
		const content = 'a value';
		const wrapper = mount( TextInput, {
			props: {
				value: content,
			},
		} );
		const inputElement = wrapper.find( 'input' );

		expect( inputElement.element.value ).toBe( content );
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
			props: {
				label,
			},
		} );

		expect( wrapper.find( '.wikit-TextInput__label' ).text() ).toBe( label );
	} );

	it( 'can be disabled', () => {
		const wrapper = mount( TextInput, {
			props: {
				disabled: true,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBe( '' );
	} );

	it( 'can have a placeholder', () => {
		const placeholder = 'a placeholder';
		const wrapper = mount( TextInput, {
			props: {
				placeholder,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'rejects errors without a message', () => {
		expect( () => mount( TextInput, {
			props: {
				error: {
					type: 'warning',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects errors without a type', () => {
		expect( () => mount( TextInput, {
			props: {
				error: {
					message: 'things went wrong',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects invalid error types', () => {
		expect( () => mount( TextInput, {
			props: {
				error: {
					type: 'not-that-bad',
				},
			},
		} ) ).toThrow();
	} );

	it.each( [
		'warning',
		'error',
	] )( 'passes the error to the ValidationMessage child component', ( errorType ) => {
		const errorMessage = 'error!!!!';
		const wrapper = mount( TextInput, {
			props: {
				error: {
					type: errorType,
					message: errorMessage,
				},
			},
		} );
		const validationMessage = wrapper.findComponent( ValidationMessage );

		expect( validationMessage.props( 'message' ) ).toBe( errorMessage );
		expect( validationMessage.props( 'type' ) ).toBe( errorType );
	} );

} );
