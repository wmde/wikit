import { mount, shallowMount } from '@vue/test-utils';
import Message from '@/components/Message.vue';
import Icon from '@/components/Icon.vue';

describe( 'Message', () => {

	it( 'shows the message', () => {
		const message = 'hello, things went wrong.';
		const wrapper = shallowMount( Message, {
			propsData: {
				type: 'error',
			},
			slots: {
				default: message,
			},
		} );

		expect( wrapper.text() ).toBe( message );
	} );

	it.each( [
		[ 'warning', 'alert' ],
		[ 'error', 'error' ],
	] )( 'shows the right icon depending on the type', ( errorType, expectedIcon ) => {
		const wrapper = mount( Message, {
			propsData: {
				type: errorType,
			},
			slots: {
				default: 'things went wrong',
			},
		} );

		expect( wrapper.findComponent( Icon ).props( 'type' ) ).toBe( expectedIcon );
	} );

	it.each( [
		'error',
		'warning',
	] )( 'renders the type as a root node class', ( type ) => {
		const wrapper = shallowMount( Message, {
			propsData: {
				type,
			},
			slots: {
				default: 'sad',
			},
		} );

		expect( wrapper.classes() ).toContain( `wikit-Message--${type}` );
	} );

	it( 'validates the `type` prop', () => {
		expect( () => shallowMount( Message, {
			propsData: {
				type: 'potato',
			},
		} ) ).toThrow();
	} );

} );
