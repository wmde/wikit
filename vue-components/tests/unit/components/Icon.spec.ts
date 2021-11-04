import { mount } from '@vue/test-utils';
import Icon from '@/components/Icon.vue';
import { iconSizes, IconDirection, iconColors, IconTypes } from '@/components/iconProps';

jest.mock( '@/components/util/generateUid', () => {
	return () => 'mockedID';
} );

describe( 'Icon', () => {

	it( 'renders an error icon given type "error"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'error',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an alert icon given type "alert"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'alert',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an edit icon given type "edit"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'edit',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an error icon given type "trash"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'trash',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders a clear icon given type "clear"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'clear',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders a newwindow icon given type "newwindow"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'newwindow',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders a clear icon given type "link"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'link',
			},
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders an outlined info icon given type "info-outlined"', () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'info-outlined',
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

	it( 'it accepts the dir prop', async () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'arrownext',
				dir: IconDirection.LTR,
			},
		} );

		expect( wrapper.props().dir ).toBe( IconDirection.LTR );

		const svg = wrapper.find( '.wikit-Icon__svg' );
		expect( svg.classes() ).not.toContain( 'wikit-Icon__svg--flipped' );

		await wrapper.setProps( {
			dir: IconDirection.RTL,
		} );
		expect( svg.classes() ).toContain( 'wikit-Icon__svg--flipped' );
	} );

} );
