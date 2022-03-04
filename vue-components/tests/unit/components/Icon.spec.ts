import { mount } from '@vue/test-utils';
import Icon from '@/components/Icon.vue';
import { iconSizes, flippable, IconDirection, iconColors, IconTypes } from '@/components/iconProps';

jest.mock( '@/components/util/generateUid', () => {
	return () => 'mockedID';
} );

describe( 'Icon', () => {

	it( 'renders an error icon given type "error"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'error',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an alert icon given type "alert"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'alert',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an edit icon given type "edit"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'edit',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an error icon given type "trash"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'trash',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders a clear icon given type "clear"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'clear',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders a newwindow icon given type "newwindow"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'newwindow',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders a clear icon given type "link"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'link',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an outlined info icon given type "info-outlined"', () => {
		const wrapper = mount( Icon, {
			props: {
				type: 'info-outlined',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'validates the type prop', () => {
		expect( () => mount( Icon, {
			props: {
				type: 'potato',
			},
		} ) ).toThrow();
	} );

	it( 'validates the color prop', () => {
		expect( () => mount( Icon, {
			props: {
				type: 'error',
				color: 'potato',
			},
		} ) ).toThrow();
	} );

	it( 'validates the size prop', () => {
		expect( () => mount( Icon, {
			props: {
				type: 'error',
				size: 'potato',
			},
		} ) ).toThrow();
	} );

	it.each(
		Object.values( IconTypes ),
	)( '%s: has at least one part of the SVG element that can be colored', ( iconType ) => {
		const wrapper = mount( Icon, {
			props: {
				type: iconType,
			},
		} );

		expect( wrapper.find( '[fill="currentColor"]' ).exists() ).toBeTruthy();
	} );

	it.each( iconColors )( 'renders the color "%s" as a root node class', ( color ) => {
		expect( mount( Icon, {
			props: {
				type: 'alert',
				color,
			},
		} ).classes() ).toContain( `wikit-Icon--${color}` );
	} );

	it.each( iconSizes )( 'renders the size "%s" as a root node class', ( size ) => {
		expect( mount( Icon, {
			props: {
				type: 'alert',
				size,
			},
		} ).classes() ).toContain( `wikit-Icon--${size}` );
	} );

	it.each( flippable )( '%s flips direction when dir is "rtl"', async ( type ) => {
		const flippedClass = 'wikit-Icon--flipped';
		const wrapper = mount( Icon, {
			props: { type },
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
			props: {
				type: 'edit',
				dir: IconDirection.RTL,
			},
		} );

		expect( wrapper.classes() ).not.toContain( flippedClass );
	} );

	it( 'validates the dir prop', () => {
		expect( () => mount( Icon, {
			props: {
				type: 'error',
				dir: 'banana',
			},
		} ) ).toThrow();
	} );

} );
