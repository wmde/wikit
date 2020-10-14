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
} );
