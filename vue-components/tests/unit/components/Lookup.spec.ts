import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Lookup from '@/components/Lookup.vue';
import LookupMenu from '@/components/LookupMenu.vue';
import Input from '@/components/Input.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';

describe( 'Lookup', () => {

	it( 'has a label', () => {
		const label = 'a label';
		const wrapper = mount( Lookup, {
			propsData: {
				label,
			},
		} );

		expect( wrapper.find( '.wikit-Lookup__label' ).text() ).toBe( label );
	} );

	it( 'can be disabled', () => {
		const wrapper = mount( Lookup, {
			propsData: {
				disabled: true,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBeTruthy();
	} );

	it( 'can have a placeholder', () => {
		const placeholder = 'a placeholder';
		const wrapper = mount( Lookup, {
			propsData: {
				placeholder,
			},
		} );

		expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'rejects invalid width props', () => {
		expect( () => mount( Lookup, {
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
		expect( mount( Lookup, {
			propsData: {
				width,
			},
		} ).classes() ).toContain( `wikit-Lookup--${width}` );
	} );

	it( 'rejects errors without a message', () => {
		expect( () => mount( Lookup, {
			propsData: {
				error: {
					type: 'warning',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects errors without a type', () => {
		expect( () => mount( Lookup, {
			propsData: {
				error: {
					message: 'things went wrong',
				},
			},
		} ) ).toThrow();
	} );

	it( 'rejects invalid error types', () => {
		expect( () => mount( Lookup, {
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
		const wrapper = mount( Lookup, {
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

	it( 'does not show the lookup menu if the input field is not focused', () => {
		const wrapper = mount( Lookup, {
			propsData: {
				menuItems: [ { label: 'potato', description: 'root vegetable' } ],
			},
		} );

		expect( wrapper.findComponent( LookupMenu ).exists() ).toBeFalsy();
	} );

	it( 'shows the lookup menu if the input field is focused and has content', () => {
		const wrapper = mount( Lookup );
		const inputField = wrapper.findComponent( Input );
		inputField.setValue( 'potato' );
		inputField.trigger( 'focus' );

		return Vue.nextTick().then( () => {
			expect( wrapper.findComponent( LookupMenu ).exists() ).toBeTruthy();
		} );
	} );

	it( 'shows the menu items that are passed as props', () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( Lookup, { propsData: { menuItems } } );
		const inputField = wrapper.findComponent( Input );
		inputField.setValue( 'something something' );
		inputField.trigger( 'focus' );

		return Vue.nextTick().then( () => {
			expect( wrapper.findComponent( LookupMenu ).props( 'menuItems' ) ).toBe( menuItems );

		} );
	} );

} );
