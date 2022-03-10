import { mount } from '@vue/test-utils';
import OptionsMenu from '@/components/OptionsMenu.vue';

describe( 'OptionsMenu', () => {
	it( 'displays the menu items', () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( OptionsMenu, { props: { menuItems } } );
		const renderedMenuItems = wrapper.findAll( '.wikit-OptionsMenu__item' );

		expect( renderedMenuItems.length ).toBe( 2 );
		expect( renderedMenuItems[ 0 ].find( '.wikit-OptionsMenu__item__label' ).text() )
			.toBe( menuItems[ 0 ].label );
		expect( renderedMenuItems[ 0 ].find( '.wikit-OptionsMenu__item__description' ).text() )
			.toBe( menuItems[ 0 ].description );
		expect( renderedMenuItems[ 1 ].find( '.wikit-OptionsMenu__item__label' ).text() )
			.toBe( menuItems[ 1 ].label );
		expect( renderedMenuItems[ 1 ].find( '.wikit-OptionsMenu__item__description' ).text() )
			.toBe( menuItems[ 1 ].description );
	} );

	it( 'shows the "no match found" text if there are no menu items', () => {
		const noResultsFoundText = 'no results. so sad.';
		const wrapper = mount( OptionsMenu, {
			props: {
				menuItems: [],
			},
			slots: {
				'no-results': noResultsFoundText,
			},
		} );

		expect( wrapper.text() ).toBe( noResultsFoundText );
	} );

	it( 'does not show the "no match found" text if there are menu items', () => {
		const wrapper = mount( OptionsMenu, {
			props: {
				menuItems: [
					{ label: 'potato', description: 'root vegetable' },
					{ label: 'duck', description: 'aquatic bird' },
				],
			},
			slots: {
				'no-results': 'no results. so sad.',
			},
		} );

		expect( wrapper.find( '.wikit-OptionsMenu__no-results' ).exists() ).toBeFalsy();
	} );

	it( 'displays the menu item tag in a menuItem', () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable', tag: 'i am a tag' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( OptionsMenu, { props: { menuItems } } );
		const renderedMenuItems = wrapper.findAll( '.wikit-OptionsMenu__item' );

		expect( renderedMenuItems[ 0 ].find( '.wikit-OptionsMenu__item__tag' ).text() )
			.toBe( menuItems[ 0 ].tag );

	} );
} );
