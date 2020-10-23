import { mount } from '@vue/test-utils';
import LookupMenu from '@/components/LookupMenu.vue';

describe( 'LookupMenu', () => {
	it( 'displays the menu items', () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( LookupMenu, { propsData: { menuItems } } );
		const renderedMenuItems = wrapper.findAll( '.wikit-LookupMenu__item' );

		expect( renderedMenuItems.length ).toBe( 2 );
		expect( renderedMenuItems.at( 0 ).find( '.wikit-LookupMenu__item__label' ).text() )
			.toBe( menuItems[ 0 ].label );
		expect( renderedMenuItems.at( 0 ).find( '.wikit-LookupMenu__item__description' ).text() )
			.toBe( menuItems[ 0 ].description );
		expect( renderedMenuItems.at( 1 ).find( '.wikit-LookupMenu__item__label' ).text() )
			.toBe( menuItems[ 1 ].label );
		expect( renderedMenuItems.at( 1 ).find( '.wikit-LookupMenu__item__description' ).text() )
			.toBe( menuItems[ 1 ].description );
	} );

	it( 'shows the "no match found" text if there are no menu items', () => {
		const noResultsFoundText = 'no results. so sad.';
		const wrapper = mount( LookupMenu, {
			propsData: {
				menuItems: [],
			},
			slots: {
				'no-results': noResultsFoundText,
			},
		} );

		expect( wrapper.text() ).toBe( noResultsFoundText );
	} );

	it( 'does not show the "no match found" text if there are menu items', () => {
		const wrapper = mount( LookupMenu, {
			propsData: {
				menuItems: [
					{ label: 'potato', description: 'root vegetable' },
					{ label: 'duck', description: 'aquatic bird' },
				],
			},
			slots: {
				'no-results': 'no results. so sad.',
			},
		} );

		expect( wrapper.find( '.wikit-LookupMenu__no-results' ).exists() ).toBeFalsy();
	} );
} );
