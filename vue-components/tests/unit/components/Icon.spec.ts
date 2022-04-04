import { mount } from '@vue/test-utils';
import Icon from '@/components/Icon.vue';
import { iconSizes, flippable, IconDirection, iconColors, IconTypes } from '@/components/iconProps';

jest.mock( '@/components/util/generateUid', () => {
	return () => 'mockedID';
} );

describe( 'Icon', () => {

	it( 'alert: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'alert',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'clear: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'clear',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'edit: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'edit',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'error: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'error',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'info-outlined: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'info-outlined',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'link: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'link',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'newwindow: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'newwindow',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'trash: matches snapshot', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'trash',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'validates the type prop', () => {
		expect( () => mount( Icon, {
			propsData: {
				type: 'potato',
			},
		} ) ).toThrow();
	} );

	it( 'validates the color prop', () => {
		expect( () => mount( Icon, {
			propsData: {
				type: 'error',
				color: 'potato',
			},
		} ) ).toThrow();
	} );

	it( 'validates the size prop', () => {
		expect( () => mount( Icon, {
			propsData: {
				type: 'error',
				size: 'potato',
			},
		} ) ).toThrow();
	} );

	it.each(
		Object.values( IconTypes ),
	)( '%s: has at least one part of the SVG element that can be colored', ( iconType ) => {
		const wrapper = mount( Icon, {
			propsData: {
				type: iconType,
			},
		} );

		expect( wrapper.find( '[fill="currentColor"]' ).exists() ).toBeTruthy();
	} );

	it.each( iconColors )( 'renders the color "%s" as a root node class', ( color ) => {
		expect( mount( Icon, {
			propsData: {
				type: 'alert',
				color,
			},
		} ).classes() ).toContain( `wikit-Icon--${color}` );
	} );

	it.each( iconSizes )( 'renders the size "%s" as a root node class', ( size ) => {
		expect( mount( Icon, {
			propsData: {
				type: 'alert',
				size,
			},
		} ).classes() ).toContain( `wikit-Icon--${size}` );
	} );

	it.each( flippable )( '%s flips direction when dir is "rtl"', async ( type ) => {
		const flippedClass = 'wikit-Icon--flipped';
		const wrapper = mount( Icon, {
			propsData: { type },
		} );

		expect( wrapper.props().dir ).toBe( IconDirection.LTR );
		expect( wrapper.classes() ).not.toContain( flippedClass );

		await wrapper.setProps( { dir: IconDirection.RTL } );
		expect( wrapper.props().dir ).toBe( IconDirection.RTL );
		expect( wrapper.classes() ).toContain( flippedClass );
	} );

	it( 'doesn\'t flip direction for unlocalizable icons', async () => {
		const flippedClass = 'wikit-Icon--flipped';
		const wrapper = mount( Icon, {
			propsData: {
				type: 'edit',
				dir: IconDirection.RTL,
			},
		} );

		expect( wrapper.classes() ).not.toContain( flippedClass );
	} );

	it( 'validates the dir prop', () => {
		expect( () => mount( Icon, {
			propsData: {
				type: 'error',
				dir: 'banana',
			},
		} ) ).toThrow();
	} );

} );
