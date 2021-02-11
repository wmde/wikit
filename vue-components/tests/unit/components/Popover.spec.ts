import { createLocalVue, shallowMount } from '@vue/test-utils';
import Popover from '@/components/Popover.vue';

const localVue = createLocalVue();

describe( 'Popover', () => {
	it( 'shows and hides in accordance with isShown prop', async () => {
		const wrapper = shallowMount( Popover, {
			propsData: {
				isShown: true,
			},
			slots: {
				default: 'some content',
			},
		} );
		await localVue.nextTick();
		expect( wrapper.find( '.wikit-Popover__content' ).isVisible() ).toBe( true );

		wrapper.setProps( { isShown: false } );
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( false );

		wrapper.setProps( { isShown: true } );
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).isVisible() ).toBe( true );
	} );
} );
