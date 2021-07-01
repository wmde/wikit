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

	it.each( [
		'Enter',
		' ',
		'Escape',
		'Tab',
	] )( 'hides on several key events', async ( key ) => {
		const wrapper = shallowMount( Popover, {
			propsData: {
				isShown: true,
			},
			slots: {
				default: 'some content',
			},
		} );
		await localVue.nextTick();
		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( true );

		jest.useFakeTimers();
		wrapper.trigger( 'keydown', { key } );
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

	it( 'is shown upon clicking the target', async () => {
		const wrapper = shallowMount( Popover, {
			slots: {
				default: 'some content',
				target: '<button>click me!</button>',
			},
		} );

		wrapper.find( 'button' ).trigger( 'click' );
		await localVue.nextTick();

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( true );
	} );

	it( 'disappears after clicking somewhere else', async () => {
		const div = document.createElement( 'div' );
		document.body.appendChild( div );
		const ContextComponent = {
			components: { Popover },
			template: '<div><button></button><Popover :isShown="true">some Content</Popover></div>',
		};
		const wrapper = shallowMount( ContextComponent, {
			attachTo: div,
		} );

		wrapper.get( 'button' ).trigger( 'click' );

		expect( wrapper.find( '.wikit-Popover__content' ).exists() ).toBe( false );
		wrapper.destroy();
	} );

	it( 'sets position of popover based on prop value', async () => {
		const wrapper = shallowMount( Popover, {
			propsData: {
				reactToHover: false,
				isShown: true,
			},
			slots: {
				default: 'some content',
			},
		} );

		expect( wrapper.classes() ).toContain( 'wikit-Popover--top' );

		await wrapper.setProps( { position: 'bottom-right' } );
		expect( wrapper.classes() ).toContain( 'wikit-Popover--bottom-right' );
	} );
} );
