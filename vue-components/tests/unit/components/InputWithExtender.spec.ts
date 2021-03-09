import { mount } from '@vue/test-utils';
import InputWithExtender from '@/components/InputWithExtender.vue';
import TextInput from '@/components/TextInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';

describe( 'InputWithExtender', () => {

	it( 'takes text input', () => {
		const content = 'a value';
		const wrapper = mount( InputWithExtender, {
			propsData: {
				value: content,
			},
		} );
		const inputElement = wrapper.find( 'input' );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( content );
	} );

	it( 'emits an input event on user input', () => {
		const userInput = 'hello';
		const wrapper = mount( InputWithExtender );

		wrapper.find( 'input' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ userInput ] );
	} );

	it( 'has a label', () => {
		const label = 'a label';
		const wrapper = mount( InputWithExtender, {
			propsData: {
				label,
			},
		} );

		expect( wrapper.find( '.wikit-TextInput__label' ).text() ).toBe( label );
	} );

	it( 'can be disabled', () => {
		const wrapper = mount( InputWithExtender, {
			propsData: {
				disabled: true,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBeTruthy();
	} );

	it( 'can have a placeholder', () => {
		const placeholder = 'a placeholder';
		const wrapper = mount( InputWithExtender, {
			propsData: {
				placeholder,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'shows the extender on focus', async () => {
		const wrapper = mount( InputWithExtender, {} );

		await wrapper.findComponent( TextInput ).vm.$emit( 'focus' );

		expect( wrapper.findAll( '.wikit-InputWithExtender__extension' ) ).toHaveLength( 1 );
	} );

	it( 'shows the extender on input', async () => {
		const wrapper = mount( InputWithExtender, {} );

		await wrapper.findComponent( TextInput ).vm.$emit( 'input', 'foo' );

		expect( wrapper.findAll( '.wikit-InputWithExtender__extension' ) ).toHaveLength( 1 );
	} );

	it( 'hides the extender on blur', async () => {
		const wrapper = mount( InputWithExtender, {} );

		await wrapper.findComponent( TextInput ).vm.$emit( 'focus' );
		await wrapper.findComponent( TextInput ).vm.$emit( 'blur' );

		expect( wrapper.findAll( '.wikit-InputWithExtender__extension' ) ).toHaveLength( 0 );
	} );

	it( 'rejects errors without a message', () => {
		expect( () => mount( InputWithExtender, {
			propsData: {
				error: {
					type: 'warning',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects errors without a type', () => {
		expect( () => mount( InputWithExtender, {
			propsData: {
				error: {
					message: 'things went wrong',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects invalid error types', () => {
		expect( () => mount( InputWithExtender, {
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
		const wrapper = mount( InputWithExtender, {
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
