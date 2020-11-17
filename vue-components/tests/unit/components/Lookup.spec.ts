import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import Lookup from '@/components/Lookup.vue';
import LookupMenu from '@/components/LookupMenu.vue';
import Input from '@/components/Input.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import { MenuItem } from '@/components/MenuItem';

async function createLookupWrapperWithExpandedMenu( menuItems: MenuItem[] ): Promise<Wrapper<Lookup>> {
	const wrapper = mount( Lookup, { propsData: {
		menuItems,
		searchInput: 'some non-empty input',
	} } );
	wrapper.findComponent( Input ).trigger( 'focus' );

	await Vue.nextTick();
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

	it( 'shows the menu items that are passed as props', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );

		expect( wrapper.findComponent( LookupMenu ).props( 'menuItems' ) ).toBe( menuItems );
	} );

	it( 'emits an `input` event containing the selected menu item upon selection', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );

		const selectedItem = 1;
		wrapper.findAll( '.wikit-LookupMenu__item' ).at( selectedItem ).element.click();

		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ menuItems[ selectedItem ] ] );
	} );

	it( "emits `update:searchInput` containing the selected item's label upon selection", async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );

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

	it( 'shows the previously selected menu item after regaining focus, if available', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const highlightedItemLabelSelector = '.wikit-LookupMenu__item--selected .wikit-LookupMenu__item__label';

		const wrapper = mount( Lookup, {
			propsData: {
				value: { label: 'duck', description: 'aquatic bird' },
				menuItems,
				searchInput: 'potato',
			},
		} );

		wrapper.findComponent( Input ).trigger( 'focus' );
		await Vue.nextTick();
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( 1 );
		expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'duck' );
	} );

	it( 'allows navigation with the up and down arrow keys', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const highlightedItemLabelSelector = '.wikit-LookupMenu__item--selected .wikit-LookupMenu__item__label';

		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );
		expect( wrapper.findComponent( LookupMenu ).exists() ).toBe( true );
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( -1 );
		expect( wrapper.find( highlightedItemLabelSelector ).exists() ).toBe( false );

		wrapper.findComponent( Input ).trigger( 'keydown.down.native' );
		await Vue.nextTick();
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( 0 );
		expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );

		wrapper.findComponent( Input ).trigger( 'keydown.down.native' );
		await Vue.nextTick();
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( 1 );
		expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'duck' );

		wrapper.findComponent( Input ).trigger( 'keydown.down.native' );
		await Vue.nextTick();
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( 1 );
		expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'duck' );

		wrapper.findComponent( Input ).trigger( 'keydown.up.native' );
		await Vue.nextTick();
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( 0 );
		expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );

		wrapper.findComponent( Input ).trigger( 'keydown.up.native' );
		await Vue.nextTick();
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( 0 );
		expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );
	} );

	it( 'closes the menu on Esc key', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );

		wrapper.setData( { selectedItemIndex: 0 } );
		wrapper.findComponent( Input ).trigger( 'keyup.esc.native' );

		await Vue.nextTick();

		expect( wrapper.findComponent( LookupMenu ).exists() ).toBeFalsy();
		expect( wrapper.vm.$data.selectedItemIndex ).toBe( -1 );
	} );

	it( 'selects an item on Tab key', async () => {
		const userInput = 'potato';
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );

		const selectedItemIndex = 0;
		wrapper.find( 'input' ).setValue( userInput );
		wrapper.setData( { selectedItemIndex } );

		wrapper.findComponent( Input ).trigger( 'keydown.tab.native' );

		expect( wrapper.vm.$data.selectedItemIndex ).toBe( -1 );
		expect( ( wrapper.emitted( 'update:searchInput' ) )![ 0 ] ).toStrictEqual( [ userInput ] );
		expect( wrapper.emitted( 'input' )!.pop() ).toStrictEqual( [ menuItems[ selectedItemIndex ] ] );
	} );

	it( 'selects an item on enter key', async () => {
		const userInput = 'potato';
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );

		wrapper.find( 'input' ).setValue( userInput );
		wrapper.setData( { selectedItemIndex: 0 } );

		wrapper.findComponent( Input ).trigger( 'keyup.enter.native' );
		await Vue.nextTick();

		expect( wrapper.vm.$data.selectedItemIndex ).toBe( -1 );
		expect( wrapper.findComponent( LookupMenu ).exists() ).toBe( false );

		wrapper.findComponent( Input ).trigger( 'focus' );
		await Vue.nextTick();
		expect( wrapper.findComponent( LookupMenu ).exists() ).toBe( true );
	} );

	it( 'maintains state on enter key without any item selection', async () => {
		const userInput = 'potato';
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const wrapper = await createLookupWrapperWithExpandedMenu( menuItems );

		wrapper.find( 'input' ).setValue( userInput );
		wrapper.setData( { selectedItemIndex: -1 } );

		wrapper.findComponent( Input ).trigger( 'keyup.enter.native' );

		expect( wrapper.vm.$data.selectedItemIndex ).toBe( -1 );

		return Vue.nextTick().then( () => {
			expect( wrapper.findComponent( LookupMenu ).exists() ).toBeTruthy();
		} );
	} );
} );
