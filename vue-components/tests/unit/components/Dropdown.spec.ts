import Vue from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import Dropdown from '@/components/Dropdown.vue';
import OptionsMenu from '@/components/OptionsMenu.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import { MenuItem } from '@/components/MenuItem';

async function createDropdownWrapperWithExpandedMenu( menuItems: MenuItem[] ): Promise<Wrapper<Dropdown>> {
	const wrapper = mount( Dropdown, { propsData: {
		menuItems,
	} } );
	wrapper.find( '.wikit-Dropdown__select' ).trigger( 'click' );

	await Vue.nextTick();
	return wrapper;
}

describe( 'Dropdown', () => {

	it( 'has a label', () => {
		const label = 'a label';
		const wrapper = mount( Dropdown, {
			propsData: {
				label,
			},
		} );

		expect( wrapper.find( '.wikit-Dropdown__label' ).text() ).toBe( label );
	} );

	it( 'can be disabled', () => {
		const wrapper = mount( Dropdown, {
			propsData: {
				disabled: true,
			},
		} );

		expect( wrapper.find( '.wikit-Dropdown__select' ).attributes( 'disabled' ) ).toBe( 'disabled' );
	} );

	it( 'can have a placeholder', () => {
		const placeholder = 'a placeholder';
		const wrapper = mount( Dropdown, {
			propsData: {
				placeholder,
			},
		} );

		expect( wrapper.text() ).toBe( placeholder );
	} );

	it( 'does not show the Dropdown menu if the select field is not focused', () => {
		const wrapper = mount( Dropdown, {
			propsData: {
				menuItems: [ { label: 'potato', description: 'root vegetable' } ],
			},
		} );

		expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( false );
	} );

	it( 'shows the Dropdown menu on click', async () => {
		const wrapper = mount( Dropdown );
		wrapper.find( '.wikit-Dropdown__select' ).trigger( 'click' );

		await Vue.nextTick();
		expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( true );
	} );

	it( 'shows the Dropdown menu on pressing Enter', async () => {
		const wrapper = mount( Dropdown );
		wrapper.trigger( 'keydown', { key: 'Enter' } );

		await Vue.nextTick();
		expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( true );
	} );

	it( 'shows the Dropdown menu on pressing Arrow-down', async () => {
		const wrapper = mount( Dropdown );
		wrapper.trigger( 'keydown', { key: 'ArrowDown' } );

		await Vue.nextTick();
		expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( true );
	} );

	it( 'shows the menu items that are passed as props', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = await createDropdownWrapperWithExpandedMenu( menuItems );

		expect( wrapper.findComponent( OptionsMenu ).props( 'menuItems' ) ).toBe( menuItems );
	} );

	it( 'emits an `input` event containing the selected menu item upon selection', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = await createDropdownWrapperWithExpandedMenu( menuItems );

		const selectedItem = 1;
		wrapper.findAll( '.wikit-OptionsMenu__item' ).at( selectedItem ).element.click();

		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ menuItems[ selectedItem ] ] );
	} );

	it( 'shows the currently selected menu item after reopening it', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const selectedItemLabelSelector = '.wikit-OptionsMenu__item--selected .wikit-OptionsMenu__item__label';

		const wrapper = mount( Dropdown, {
			propsData: {
				value: { label: 'duck', description: 'aquatic bird' },
				menuItems,
			},
		} );

		wrapper.find( '.wikit-Dropdown__select' ).trigger( 'click' );
		await Vue.nextTick();
		expect( wrapper.findComponent( OptionsMenu ).props().selectedItemIndex ).toBe( 1 );
		expect( wrapper.find( selectedItemLabelSelector ).text() ).toBe( 'duck' );
	} );

	describe( 'Dropdown menu keyboard navigation', () => {
		it( 'allows navigation with the up and down arrow keys', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const highlightedItemLabelSelector = '.wikit-OptionsMenu__item--hovered .wikit-OptionsMenu__item__label';

			const wrapper = await createDropdownWrapperWithExpandedMenu( menuItems );
			const OptionsMenuWrapper = wrapper.findComponent( OptionsMenu );

			expect( OptionsMenuWrapper.isVisible() ).toBe( true );
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( -1 );
			expect( wrapper.find( highlightedItemLabelSelector ).exists() ).toBe( false );

			const scrollIntoViewMock = jest.fn();
			Element.prototype.scrollIntoView = scrollIntoViewMock;

			wrapper.trigger( 'keydown', { key: 'ArrowDown' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 0 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );

			wrapper.trigger( 'keydown', { key: 'ArrowDown' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 1 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'duck' );

			wrapper.trigger( 'keydown', { key: 'ArrowDown' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 1 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'duck' );

			wrapper.trigger( 'keydown', { key: 'ArrowUp' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 0 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );

			wrapper.trigger( 'keydown', { key: 'ArrowUp' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 0 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );
		} );

		it( 'closes the menu on Esc key', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const wrapper = await createDropdownWrapperWithExpandedMenu( menuItems );

			wrapper.findComponent( OptionsMenu ).setData( { keyboardHoveredItemIndex: 0 } );
			wrapper.trigger( 'keydown', { key: 'Escape' } );

			await Vue.nextTick();

			expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( false );
			expect( wrapper.findComponent( OptionsMenu ).vm.$data.keyboardHoveredItemIndex ).toBe( -1 );
		} );

		it( 'selects an item on Tab key', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const wrapper = await createDropdownWrapperWithExpandedMenu( menuItems );

			const keyboardHoveredItemIndex = 0;
			wrapper.findComponent( OptionsMenu ).setData( { keyboardHoveredItemIndex } );

			wrapper.trigger( 'keydown', { key: 'Tab' } );

			expect( wrapper.emitted( 'input' )!.pop() ).toStrictEqual( [ menuItems[ keyboardHoveredItemIndex ] ] );
		} );

		it( 'selects an item on enter key', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const wrapper = await createDropdownWrapperWithExpandedMenu( menuItems );
			const OptionsMenuWrapper = wrapper.findComponent( OptionsMenu );

			const keyboardHoveredItemIndex = 0;
			OptionsMenuWrapper.setData( { keyboardHoveredItemIndex } );

			wrapper.trigger( 'keydown', { key: 'Enter' } );
			await Vue.nextTick();

			expect( OptionsMenuWrapper.isVisible() ).toBe( false );
			expect( wrapper.emitted( 'input' )!.pop() ).toStrictEqual( [ menuItems[ keyboardHoveredItemIndex ] ] );
		} );

		it( 'maintains state on enter key without any item selection', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const wrapper = await createDropdownWrapperWithExpandedMenu( menuItems );
			wrapper.trigger( 'keydown', { key: 'Enter' } );

			expect( wrapper.findComponent( OptionsMenu ).vm.$data.keyboardHoveredItemIndex ).toBe( -1 );

			await Vue.nextTick();
			expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( true );
		} );
	} );

	describe( 'with Errors', () => {

		it( 'rejects errors without a message', () => {
			expect( () => mount( Dropdown, {
				propsData: {
					error: {
						type: 'warning',
					},
				},
			} ) ).toThrow();
		} );

		it( 'rejects errors without a type', () => {
			expect( () => mount( Dropdown, {
				propsData: {
					error: {
						message: 'things went wrong',
					},
				},
			} ) ).toThrow();
		} );

		it( 'rejects invalid error types', () => {
			expect( () => mount( Dropdown, {
				propsData: {
					error: {
						type: 'not-that-bad',
						message: 'a valid message',
					},
				},
			} ) ).toThrow();
		} );

		it.each( [
			'warning',
			'error',
		] )( 'passes the error to the ValidationMessage child component', ( errorType ) => {
			const errorMessage = 'error!!!!';
			const wrapper = mount( Dropdown, {
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
			expect( validationMessage.isVisible() ).toBe( true );
		} );
	} );
} );
