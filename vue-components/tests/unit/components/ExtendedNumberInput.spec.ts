import { mount } from '@vue/test-utils';
import ExtendedNumberInput from '@/components/ExtendedNumberInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import Vue from 'vue';

describe( 'ExtendedNumberInput', () => {

	it( 'reconstructs its content from the value prop', async () => {
		const content = { number: 123, precision: 0.5 };
		const wrapper = await mount( ExtendedNumberInput, {
			propsData: {
				value: content,
			},
		} );

		const inputElement = wrapper.find( 'input' );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '123+-0.5' );
	} );

	it( 'mount with value null means empty string as initial input', () => {
		const wrapper = mount( ExtendedNumberInput, {
			propsData: {
				value: null,
			},
		} );

		const inputElement = wrapper.find( 'input' );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '' );
	} );

	it( 'set different value after mount', async () => {
		const wrapper = mount( ExtendedNumberInput );

		const inputElement = wrapper.find( 'input' );
		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '' );

		await wrapper.setProps( { value: { number: 123, precision: 0.5 } } );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '123+-0.5' );
	} );

	it( 'set same value after mount -> doesn\'t change current text', async () => {
		const wrapper = mount( ExtendedNumberInput, {
			data() {
				return {
					textValue: '123 ± 1e1',
				};
			},
		} );

		const inputElement = wrapper.find( 'input' );
		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '123 ± 1e1' );

		await wrapper.setProps( { value: { number: 123, precision: 10 } } );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '123 ± 1e1' );
	} );

	it( 'changes the input string if changed value differs from current valid parsed value', async () => {
		const wrapper = mount( ExtendedNumberInput, {
			data() {
				return {
					textValue: '123 ± 1e1',
				};
			},
		} );

		const inputElement = wrapper.find( 'input' );
		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '123 ± 1e1' );

		await wrapper.setProps( { value: { number: 12, precision: null } } );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '12' );
	} );

	it( 'doesn\'t affect the input string if the changed value is `null`', async () => {
		const wrapper = await mount( ExtendedNumberInput, {
			propsData: {
				value: { number: 123, precision: 10 },
			},
		} );

		const inputElement = wrapper.find( 'input' );
		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '123+-10' );

		await wrapper.setProps( { value: null } );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( '123+-10' );
	} );

	it( 'emits events on invalid user input', () => {
		const userInput = 'hello';
		const wrapper = mount( ExtendedNumberInput );

		wrapper.find( 'input' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ null ] );
		expect( wrapper.emitted( 'invalid-input' )![ 0 ] ).toEqual( [ userInput ] );
	} );

	it( 'emits an input event on valid user input', () => {
		const number = 123;
		const precision = 2;
		const userInput = `${number}+-${precision}`;
		const wrapper = mount( ExtendedNumberInput );

		wrapper.find( 'input' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ { number, precision } ] );
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
