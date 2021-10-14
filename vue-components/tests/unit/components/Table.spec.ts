import { mount } from '@vue/test-utils';
import Table from '@/components/Table.vue';
import { Breakpoint } from '@/components/Breakpoint.ts';

describe( 'Table.vue', () => {
	it( 'accepts a linearize property', () => {
		const wrapper = mount( Table, {
			propsData: {
				linearize: Breakpoint.Desktop,
			},
		} );

		expect( wrapper.props().linearize ).toBe( Breakpoint.Desktop );
		expect( wrapper.find( 'table' ).classes() ).toContain( 'wikit-Table--linear-desktop' );
	} );

	it( 'ignores invalid breakpoint values', () => {
		expect( () => mount( Table, {
			propsData: { linearize: 'nonsense' },
		} ) ).toThrow( 'Invalid prop: custom validator check failed for prop "linearize"' );
	} );
} );
