import { mount } from '@vue/test-utils';
import DateInput from '@/components/DateInput.vue';
import Input from '@/components/Input.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import BouncingDots from '@/components/BouncingDots.vue';

describe( 'DateInput', () => {

	it( 'takes text input', () => {
		const content = '2020-10-10';
		const wrapper = mount( DateInput, {
			propsData: {
				value: content,
			},
		} );
		const inputElement = wrapper.find( 'input' );

		expect( ( inputElement.element as HTMLFormElement ).value ).toBe( content );
	} );

	it( 'emits an input event on user input', () => {
		const userInput = '2020-10-10';
		const wrapper = mount( DateInput );

		wrapper.find( 'input' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ userInput ] );
	} );

	it( 'has a label', () => {
		const label = 'a label';
		const wrapper = mount( DateInput, {
			propsData: {
				label,
			},
		} );

		expect( wrapper.find( '.wikit-InputWithExtender__label' ).text() ).toBe( label );
	} );

	it( 'can be disabled', () => {
		const wrapper = mount( DateInput, {
			propsData: {
				disabled: true,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBeTruthy();
	} );

	it( 'can have a placeholder', () => {
		const placeholder = 'a placeholder';
		const wrapper = mount( DateInput, {
			propsData: {
				placeholder,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'show intro when focused', async () => {
		const wrapper = mount( DateInput, {
			slots: {
				prompt: 'Set the date please!',
			},
		} );

		await wrapper.findComponent( Input ).trigger( 'focus' );

		expect( wrapper.findAll( '.wikit-InputWithExtender__extension' ) ).toHaveLength( 1 );
		expect( wrapper.find( '.wikit-InputWithExtender__extension' ).text() ).toBe( 'Set the date please!' );
	} );

	it( 'shows the dots on input when parsed value is not set', async () => {
		const wrapper = mount( DateInput, {
			propsData: {
				value: '2020-10-10',
				parsedValue: null,
			},
		} );

		await wrapper.findComponent( Input ).trigger( 'focus' );

		expect( wrapper.findAllComponents( BouncingDots ) ).toHaveLength( 1 );
	} );

	it( 'shows the calendar notice and parsed value when it is provided', async () => {
		const wrapper = mount( DateInput, {
			propsData: {
				value: '2020-10-10',
				parsedValue: '10 November 2020',
				calendarNotice: 'All dates are Gregorian',
			},
		} );
		await wrapper.findComponent( Input ).trigger( 'focus' );

		expect( wrapper.findAll( '.wikit-DateInput__ParsedValue' ) ).toHaveLength( 1 );
		expect( wrapper.findAll( '.wikit-DateInput__CalendarNotice' ) ).toHaveLength( 1 );
		expect( wrapper.find( '.wikit-DateInput__ParsedValue' ).text() ).toBe( '10 November 2020' );
		expect( wrapper.find( '.wikit-DateInput__CalendarNotice' ).text() ).toBe( 'All dates are Gregorian' );
	} );

	it( 'rejects errors without a message', () => {
		expect( () => mount( DateInput, {
			propsData: {
				error: {
					type: 'warning',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects errors without a type', () => {
		expect( () => mount( DateInput, {
			propsData: {
				error: {
					message: 'things went wrong',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects invalid error types', () => {
		expect( () => mount( DateInput, {
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
		const wrapper = mount( DateInput, {
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
