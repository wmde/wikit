import { mount, Wrapper } from '@vue/test-utils';
import Input from '@/components/Input.vue';
import Vue from 'vue';
import OptionsMenu from '@/components/OptionsMenu.vue';
import { MenuItem } from '@/components/MenuItem';
import LookupInput from '@/components/LookupInput.vue';

async function createLookupInputWrapperWithExpandedMenu( menuItems: MenuItem[] ): Promise<Wrapper<LookupInput>> {
	const wrapper = mount( LookupInput, {
		propsData: {
			menuItems,
			searchInput: 'some non-empty input',
		},
	} );
	wrapper.findComponent( Input ).trigger( 'focus.native' );

	await Vue.nextTick();
	return wrapper;
}

describe( 'LookupInput', () => {
	afterEach( () => {
		jest.useRealTimers();
	} );

	it( 'shows the previously selected menu item after regaining focus, if available', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];

		const selectedItemLabelSelector = '.wikit-OptionsMenu__item--selected .wikit-OptionsMenu__item__label';

		const wrapper = mount( LookupInput, {
			propsData: {
				value: { label: 'duck', description: 'aquatic bird' },
				menuItems,
				searchInput: 'potato',
			},
		} );

		wrapper.findComponent( Input ).trigger( 'focus' );
		await Vue.nextTick();
		expect( wrapper.findComponent( OptionsMenu ).props().selectedItemIndex ).toBe( 1 );
		expect( wrapper.find( selectedItemLabelSelector ).text() ).toBe( 'duck' );
	} );

	it( 'does not show the lookup menu if the input field is not focused', () => {
		const wrapper = mount( LookupInput, {
			propsData: {
				menuItems: [ { label: 'potato', description: 'root vegetable' } ],
			},
		} );

		expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( false );
	} );

	it( 'shows the lookup menu if the input field is focused and has content', () => {
		const wrapper = mount( LookupInput, {
			propsData: {
				searchInput: 'some non-empty input',
			},
		} );
		wrapper.findComponent( Input ).trigger( 'focus.native' );

		return Vue.nextTick().then( () => {
			expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( true );
		} );
	} );

	it( 'passes the no-results slot to the lookup menu', async () => {
		const noResultsText = 'no results :(';
		const wrapper = mount( LookupInput, {
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

		expect( wrapper.find( '.wikit-LookupInput__menu' ).text() ).toBe( noResultsText );
	} );

	describe( ':props', () => {
		it( ':menuItems - shows the menu items that are passed as props', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];
			const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );

			expect( wrapper.findComponent( OptionsMenu ).props( 'menuItems' ) ).toBe( menuItems );
		} );

		it( ':disabled - can be disabled', () => {
			const wrapper = mount( LookupInput, {
				propsData: {
					disabled: true,
				},
			} );

			expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBeTruthy();
		} );

		it( ':placeholder - shows the placeholder in the input', () => {
			const placeholder = 'a placeholder';
			const wrapper = mount( LookupInput, {
				propsData: {
					placeholder,
				},
			} );

			expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
		} );

		it( ':feedbackType - passes the feedback type to the Input', () => {
			const feedbackType = 'error';
			const wrapper = mount( LookupInput, {
				propsData: {
					feedbackType,
				},
			} );

			expect( wrapper.findComponent( Input ).props( 'feedbackType' ) ).toBe( feedbackType );
		} );

		it( ':searchInput - is the value of the input', async () => {
			const testSearchInput = 'Lorem Ipsum';
			const wrapper = mount( LookupInput );

			expect( wrapper.find( 'input' ).props( 'value' ) ).toBe( '' );

			wrapper.setProps( { searchInput: testSearchInput } );
			await Vue.nextTick();

			expect( wrapper.find( 'input' ).props( 'value' ) ).toBe( testSearchInput );
		} );

		it( ':value - is the menuItem that is selected', async () => {
			const menuItems = [
				{
					label: 'potato',
					description: 'root vegetable',
					value: 'Q10998',
				},
				{
					label: 'carrot',
					description: 'root vegetable, usually orange in color',
					value: 'Q81',
					tag: 'limited support',
				},
				{
					label: 'zucchini',
					description: 'Edible summer squash, typically green in colour',
					value: 'Q7533',
				},
			];
			const testValue = {
				label: 'carrot',
				description: 'root vegetable, usually orange in color',
				value: 'Q81',
				tag: 'limited support',
			};
			const wrapper = mount( LookupInput, {
				propsData: {
					menuItems,
				},
			} );

			expect( wrapper.findComponent( OptionsMenu ).props( 'selectedItemIndex' ) ).toBe( -1 );

			wrapper.setProps( { value: testValue } );
			await Vue.nextTick();

			expect( wrapper.findComponent( OptionsMenu ).props( 'selectedItemIndex' ) ).toBe( 1 );
		} );
	} );

	describe( '@events', () => {

		it( '@input - emits an `input` event containing the selected menu item upon selection', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];
			const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );

			const selectedItem = 1;
			wrapper.findAll( '.wikit-OptionsMenu__item' ).at( selectedItem ).trigger( 'click' );

			expect( wrapper.emitted( 'input' )![ 0 ] ).toStrictEqual( [ menuItems[ selectedItem ] ] );
		} );

		it(
			'@input - emits an `input` event containing null when changing the internal input to denote deselection',
			async () => {
				const menuItems = [
					{ label: 'potato', description: 'root vegetable' },
					{ label: 'duck', description: 'aquatic bird' },
				];
				const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );

				wrapper.find( 'input' ).setValue( 'potato' );

				expect( wrapper.emitted( 'input' )![ 0 ] ).toStrictEqual( [ null ] );
			},
		);

		it(
			'@update:searchInput - emits `update:searchInput` containing the selected item\'s label upon selection',
			async () => {
				const menuItems = [
					{ label: 'potato', description: 'root vegetable' },
					{ label: 'duck', description: 'aquatic bird' },
				];
				const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );

				const selectedItem = 1;
				wrapper.findAll( '.wikit-OptionsMenu__item' ).at( selectedItem ).trigger( 'click' );

				expect( ( wrapper.emitted( 'update:searchInput' ) )![ 0 ] )
					.toStrictEqual( [ menuItems[ selectedItem ].label ] );
			},
		);

		it( '@update:searchInput - emits `update:searchInput` when the internal input element receives input', () => {
			const wrapper = mount( LookupInput );
			const userInput = 'potato';
			wrapper.find( 'input' ).setValue( userInput );

			expect( ( wrapper.emitted( 'update:searchInput' ) )![ 0 ] ).toStrictEqual( [ userInput ] );
		} );

		it(
			'@scroll - it emits the currently visible first and last option index on scroll, but only if they changed',
			() => {
				const wrapper = mount( LookupInput );
				const optionsMenuWrapper = wrapper.findComponent( OptionsMenu );

				optionsMenuWrapper.vm.$emit( 'scroll', 1, 5 );

				expect( wrapper.emitted( 'scroll' ) ).toStrictEqual( [
					[ 1, 5 ],
				] );

				optionsMenuWrapper.vm.$emit( 'scroll', 1, 5 );

				// No event emitted if visible options don't change
				expect( wrapper.emitted( 'scroll' ) ).toStrictEqual( [
					[ 1, 5 ],
				] );

				optionsMenuWrapper.vm.$emit( 'scroll', 2, 6 );

				expect( wrapper.emitted( 'scroll' ) ).toStrictEqual( [
					[ 1, 5 ],
					[ 2, 6 ],
				] );
			},
		);

	} );

	describe( 'Keyboard behavior', () => {
		it( 'allows navigation with the up and down arrow keys', async () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const highlightedItemLabelSelector = '.wikit-OptionsMenu__item--hovered .wikit-OptionsMenu__item__label';

			const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );
			const OptionsMenuWrapper = wrapper.findComponent( OptionsMenu );
			const inputWrapper = wrapper.find( 'input' );

			expect( OptionsMenuWrapper.isVisible() ).toBe( true );
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( -1 );
			expect( wrapper.find( highlightedItemLabelSelector ).exists() ).toBe( false );

			const scrollIntoViewMock = jest.fn();
			Element.prototype.scrollIntoView = scrollIntoViewMock;
			jest.useFakeTimers();

			inputWrapper.trigger( 'keydown', { key: 'ArrowDown' } );
			await Vue.nextTick();
			jest.runAllTimers();
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 0 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );

			inputWrapper.trigger( 'keydown', { key: 'ArrowDown' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 1 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'duck' );

			inputWrapper.trigger( 'keydown', { key: 'ArrowDown' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 1 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'duck' );

			inputWrapper.trigger( 'keydown', { key: 'ArrowUp' } );
			expect( scrollIntoViewMock ).toHaveBeenCalled();
			await Vue.nextTick();
			expect( OptionsMenuWrapper.vm.$data.keyboardHoveredItemIndex ).toBe( 0 );
			expect( wrapper.find( highlightedItemLabelSelector ).text() ).toBe( 'potato' );

			inputWrapper.trigger( 'keydown', { key: 'ArrowUp' } );
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

			const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );

			wrapper.findComponent( OptionsMenu ).setData( { keyboardHoveredItemIndex: 0 } );
			wrapper.findComponent( Input ).trigger( 'keydown', { key: 'Escape' } );

			await Vue.nextTick();

			expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( false );
			expect( wrapper.findComponent( OptionsMenu ).vm.$data.keyboardHoveredItemIndex ).toBe( -1 );
		} );

		it( 'selects an item on Tab key', async () => {
			const userInput = 'potato';
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );
			const inputWrapper = wrapper.find( 'input' );

			const keyboardHoveredItemIndex = 0;
			inputWrapper.setValue( userInput );
			wrapper.findComponent( OptionsMenu ).setData( { keyboardHoveredItemIndex } );

			inputWrapper.trigger( 'keydown', { key: 'Tab' } );

			expect( ( wrapper.emitted( 'update:searchInput' ) )![ 0 ] ).toStrictEqual( [ userInput ] );
			expect( wrapper.emitted( 'input' )!.pop() ).toStrictEqual( [ menuItems[ keyboardHoveredItemIndex ] ] );
		} );

		it( 'selects an item on enter key', async () => {
			const userInput = 'potato';
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );
			const OptionsMenuWrapper = wrapper.findComponent( OptionsMenu );

			const inputWrapper = wrapper.find( 'input' );
			inputWrapper.setValue( userInput );
			OptionsMenuWrapper.setData( { keyboardHoveredItemIndex: 0 } );

			inputWrapper.trigger( 'keydown', { key: 'Enter' } );
			await Vue.nextTick();

			expect( OptionsMenuWrapper.isVisible() ).toBe( false );

			wrapper.findComponent( Input ).trigger( 'focus.native' );
			await Vue.nextTick();
			expect( OptionsMenuWrapper.isVisible() ).toBe( true );
		} );

		it( 'maintains state on enter key without any item selection', async () => {
			const userInput = 'potato';
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];

			const wrapper = await createLookupInputWrapperWithExpandedMenu( menuItems );

			wrapper.find( 'input' ).setValue( userInput );

			wrapper.trigger( 'keydown', { key: 'Enter' } );

			expect( wrapper.findComponent( OptionsMenu ).vm.$data.keyboardHoveredItemIndex ).toBe( -1 );

			await Vue.nextTick();
			expect( wrapper.findComponent( OptionsMenu ).isVisible() ).toBe( true );
		} );
	} );

} );
