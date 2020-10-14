import { mount, shallowMount } from '@vue/test-utils';
import ValidationMessage from '@/components/ValidationMessage.vue';
import Icon from '@/components/Icon.vue';

describe( 'ValidationMessage', () => {

	it( 'shows the validation message', () => {
		const message = 'hello, things went wrong.';
		const wrapper = shallowMount( ValidationMessage, {
			propsData: {
				type: 'error',
				message,
			},
		} );

		expect( wrapper.text() ).toBe( message );
	} );

	it.each( [
		[ 'warning', 'alert' ],
		[ 'error', 'error' ],
	] )( 'shows the right icon depending on the type', ( errorType, expectedIcon ) => {
		const wrapper = mount( ValidationMessage, {
			propsData: {
				type: errorType,
				message: 'things went wrong',
			},
		} );

		expect( wrapper.findComponent( Icon ).props( 'type' ) ).toBe( expectedIcon );
	} );

	it.each( [
		'error',
		'warning',
	] )( 'renders the type as a root node class', ( type ) => {
		const wrapper = shallowMount( ValidationMessage, {
			propsData: {
				type,
				message: 'sad',
			},
		} );

		expect( wrapper.classes() ).toContain( `wikit-ValidationMessage--${type}` );
	} );

	it( 'validates the `feedback-type` prop', () => {
		expect( () => shallowMount( ValidationMessage, {
			propsData: {
				feedbackType: 'potato',
			},
		} ) ).toThrow();
	} );

} );
