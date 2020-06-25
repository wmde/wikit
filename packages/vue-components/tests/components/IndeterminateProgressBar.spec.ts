import IndeterminateProgressBar from '@/components/IndeterminateProgressBar.vue';
import { shallowMount } from '@vue/test-utils';

describe( 'IndeterminateProgressBar', () => {
	it( 'renders correctly', () => {
		const wrapper = shallowMount( IndeterminateProgressBar );
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'mounted correctly', () => {
		const wrapper = shallowMount( IndeterminateProgressBar );
		expect( wrapper.isVueInstance() ).toBe( true );
	} );
} );
