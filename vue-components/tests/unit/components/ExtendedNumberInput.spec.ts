import { mount } from '@vue/test-utils';
import ExtendedNumberInput from '@/components/ExtendedNumberInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';

describe( 'ExtendedNumberInput', () => {

	it( 'takes an input', () => {
		const content = '123';
		const wrapper = mount( ExtendedNumberInput, {
			propsData: {
				value: content,
			},
		} );
		const inputElement = wrapper.find( 'input' );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( content );
	} );

	it( 'emits events on invalid user input', () => {
		const userInput = 'hello';
		const wrapper = mount( ExtendedNumberInput );

		wrapper.find( 'input' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ userInput ] );
		expect( wrapper.emitted( 'invalid-input' )![ 0 ] ).toEqual( [ userInput ] );
	} );

	it( 'emits an input event on valid user input', () => {
		const userInput = '123';
		const wrapper = mount( ExtendedNumberInput );

		wrapper.find( 'input' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ userInput ] );
		expect( wrapper.emitted( 'invalid-input' ) ).toBeFalsy();
	} );

	it( 'has a label', () => {
		const label = 'a label';
		const wrapper = mount( ExtendedNumberInput, {
			propsData: {
				label,
			},
		} );

		expect( wrapper.find( '.wikit-ExtendedNumberInput__label' ).text() ).toBe( label );
	} );

	it( 'can be disabled', () => {
		const wrapper = mount( ExtendedNumberInput, {
			propsData: {
				disabled: true,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBeTruthy();
	} );

	it( 'can have a placeholder', () => {
		const placeholder = 'a placeholder';
		const wrapper = mount( ExtendedNumberInput, {
			propsData: {
				placeholder,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'rejects errors without a message', () => {
		expect( () => mount( ExtendedNumberInput, {
			propsData: {
				error: {
					type: 'warning',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects errors without a type', () => {
		expect( () => mount( ExtendedNumberInput, {
			propsData: {
				error: {
					message: 'things went wrong',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects invalid error types', () => {
		expect( () => mount( ExtendedNumberInput, {
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
	] )( 'passes the error to the ValidationMessage child component', ( errorType ) => {
		const errorMessage = 'error!!!!';
		const wrapper = mount( ExtendedNumberInput, {
			propsData: {
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
