import { shallowMount } from '@vue/test-utils';
import Input from '@/components/Input.vue';

describe( 'Input', () => {

	it.each( [
		'error',
		'warning',
	] )( 'renders the feedback-type as a root node class', ( type ) => {
		const wrapper = shallowMount( Input, {
			propsData: {
				feedbackType: type,
			},
		} );

		expect( wrapper.classes() ).toContain( `wikit-Input--${type}` );
	} );

	it( 'validates the `feedback-type` prop', () => {
		expect( () => shallowMount( Input, {
			propsData: {
				feedbackType: 'potato',
			},
		} ) ).toThrow();
	} );

} );
