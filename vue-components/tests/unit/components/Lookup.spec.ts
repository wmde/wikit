import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import Lookup from '@/components/Lookup.vue';
import LookupMenu from '@/components/LookupMenu.vue';
import Input from '@/components/Input.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import { MenuItem } from '@/components/MenuItem';

function createLookupWrapperWithExpandedMenu( menuItems: MenuItem[] ): Wrapper<Lookup> {
	const wrapper = mount( Lookup, { propsData: {
		menuItems,
		searchInput: 'some non-empty input',
	} } );
	wrapper.findComponent( Input ).trigger( 'focus' );

	return wrapper;
}

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
		const wrapper = mount( Lookup, {
			propsData: {
				searchInput: 'some non-empty input',
			},
		} );
		wrapper.findComponent( Input ).trigger( 'focus' );

		return Vue.nextTick().then( () => {
			expect( wrapper.findComponent( LookupMenu ).exists() ).toBeTruthy();
		} );
	} );

	it( 'shows the menu items that are passed as props', () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = createLookupWrapperWithExpandedMenu( menuItems );

		return Vue.nextTick().then( () => {
			expect( wrapper.findComponent( LookupMenu ).props( 'menuItems' ) ).toBe( menuItems );
		} );
	} );

	it( 'emits an `input` event containing the selected menu item upon selection', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = createLookupWrapperWithExpandedMenu( menuItems );

		await Vue.nextTick();

		const selectedItem = 1;
		wrapper.findAll( '.wikit-LookupMenu__item' ).at( selectedItem ).element.click();

		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ menuItems[ selectedItem ] ] );
	} );

	it( "emits `update:searchInput` containing the selected item's label upon selection", async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = createLookupWrapperWithExpandedMenu( menuItems );

		await Vue.nextTick();

		const selectedItem = 1;
		wrapper.findAll( '.wikit-LookupMenu__item' ).at( selectedItem ).element.click();

		expect( ( wrapper.emitted( 'update:searchInput' ) )![ 0 ] )
			.toEqual( [ menuItems[ selectedItem ].label ] );
	} );

	it( 'emits `update:searchInput` when the internal input element receives input', () => {
		const wrapper = mount( Lookup );
		const userInput = 'potato';
		wrapper.find( 'input' ).setValue( userInput );

		expect( ( wrapper.emitted( 'update:searchInput' ) )![ 0 ] ).toEqual( [ userInput ] );
	} );

	it( 'passes the no-results slot to the lookup menu', async () => {
		const noResultsText = 'no results :(';
		const wrapper = mount( Lookup, {
			propsData: {
				menuItems: [],
				searchInput: 'some non-empty input',
			},
			slots: {
				'no-results': noResultsText,
			},
		} );
		wrapper.findComponent( Input ).trigger( 'focus' );

		await Vue.nextTick();

		expect( wrapper.find( '.wikit-Lookup__menu' ).text() ).toBe( noResultsText );
	} );

} );
