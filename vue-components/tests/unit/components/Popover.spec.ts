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

	it( 'shows and hides on hover', async () => {
		const wrapper = shallowMount( Popover, {
			slots: {
				default: 'some content',
				target: '<button>some text</button>',
			},
		} );
		jest.useFakeTimers();

		wrapper.trigger( 'mouseenter' );
		jest.runAllTimers();
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( true );

		wrapper.trigger( 'mouseleave' );
		jest.runAllTimers();
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( false );
	} );

	it( 'doesn\'t start showing if only hovered for a very short time', async () => {
		const wrapper = shallowMount( Popover, {
			slots: {
				default: 'some content',
				target: '<button>some text</button>',
			},
		} );
		jest.useFakeTimers();

		wrapper.trigger( 'mouseenter' );
		wrapper.trigger( 'mouseleave' );
		jest.runAllTimers();
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( false );
	} );

	it( 'doesn\'t stop showing if only not hovered for a very short time', async () => {
		const wrapper = shallowMount( Popover, {
			propsData: {
				isShown: true,
			},
			slots: {
				default: 'some content',
				target: '<button>some text</button>',
			},
		} );
		jest.useFakeTimers();

		wrapper.trigger( 'mouseleave' );
		wrapper.trigger( 'mouseenter' );
		jest.runAllTimers();
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( true );
	} );

	it( 'won\'t become visible on hover, if `reactToHover` prop is false', async () => {
		const wrapper = shallowMount( Popover, {
			propsData: {
				reactToHover: false,
			},
			slots: {
				default: 'some content',
			},
		} );
		jest.useFakeTimers();

		wrapper.trigger( 'mouseenter' );
		jest.runAllTimers();
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( false );
	} );

	it( 'won\'t disappear on stopping to hover, if `reactToHover` prop is false', async () => {
		const wrapper = shallowMount( Popover, {
			propsData: {
				reactToHover: false,
				isShown: true,
			},
			slots: {
				default: 'some content',
			},
		} );
		jest.useFakeTimers();

		wrapper.trigger( 'mouseleave' );
		jest.runAllTimers();
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( true );
	} );
} );
