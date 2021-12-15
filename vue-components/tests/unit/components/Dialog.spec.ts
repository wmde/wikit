import { mount, Wrapper } from '@vue/test-utils';
import Dialog from '@/components/Dialog.vue';

describe( 'Dialog.vue', () => {

	function createWrapper( {
		props = { },
		slots = { },
		...additionalOptions
	}: Record<string, any> = { } ): Wrapper<Dialog> {
		const defaultPropsData = {
			title: '',
			actions: [],
		};

		return mount( Dialog, {
			propsData: {
				...defaultPropsData,
				...props,
			},
			slots,
			...additionalOptions,
		} );
	}

	// Props
	it( 'accepts and renders title prop', () => {
		const title = 'Hello World!';

		const wrapper = createWrapper( { props: { title } } );

		const header = wrapper.find( 'header' );

		expect( wrapper.props().title ).toBe( title );
		expect( header.text() ).toContain( title );
	} );

	it( 'accepts and renders actions prop', () => {
		const actions = [
			{
				label: 'Primary Test!',
				namespace: 'primary-test',
			},
			{
				label: 'Secondary Test!',
				namespace: 'secondary-test',
			},
		];

		const wrapper = createWrapper( { props: { actions } } );

		const footer = wrapper.find( 'footer' );

		expect( wrapper.props().actions ).toBe( actions );

		actions.forEach( ( { label, namespace }, i ) => {
			const variants = ( i === 0 ) ? [ 'primary', 'progressive' ] : [ 'normal', 'neutral' ];
			const button = footer.find( `.${namespace}` );

			variants.map( ( variant ) => `wikit-Button--${variant}` )
				.forEach( expect( button.classes() ).toContain );

			expect( button.text() ).toBe( label );
		} );
	} );

	it( 'accepts dismiss-button prop', () => {
		const wrapper = createWrapper( { props: { dismissButton: true } } );

		const closeButton = wrapper.find( '.wikit-Dialog__close' );

		expect( wrapper.props().dismissButton ).toBe( true );
		expect( closeButton.exists() ).toBe( true );
	} );

	it( 'accepts visible prop and shows dialog', async () => {
		const wrapper = createWrapper( { props: { visible: true } } );

		const content = wrapper.find( '.wikit-Dialog' );

		expect( wrapper.props().visible ).toBe( true );
		expect( content.isVisible() ).toBe( true );

		await wrapper.setProps( { visible: false } );
		expect( content.isVisible() ).toBe( false );
	} );

	// Slots
	it( 'renders content slot', () => {
		const content = '<p>Hello World</p>';
		const wrapper = createWrapper( { slots: { default: content } } );

		const slot = wrapper.find( '.wikit-Dialog__content' );

		expect( slot.element.innerHTML ).toBe( content );
	} );

	// Methods
	it( 'opens when calling the show method', async () => {
		const wrapper = createWrapper( { props: { visible: false } } );

		const content = wrapper.find( '.wikit-Dialog' );

		// TypeScript does not recognise custom methods defined on component vm
		( wrapper.vm as any ).show();
		await wrapper.vm.$nextTick();

		expect( content.isVisible() ).toBe( true );
	} );

	it( 'closes when calling the hide method', async () => {
		const wrapper = createWrapper( { props: { visible: true } } );

		const content = wrapper.find( '.wikit-Dialog' );

		// TypeScript does not recognise custom methods defined on component vm
		( wrapper.vm as any ).hide();
		await wrapper.vm.$nextTick();

		expect( content.isVisible() ).toBe( false );
	} );

	it( 'closes when calling the dismiss method', async () => {
		const wrapper = createWrapper( { props: { visible: true } } );

		const content = wrapper.find( '.wikit-Dialog' );

		// TypeScript does not recognise custom methods defined on component vm
		( wrapper.vm as any ).dismiss();
		await wrapper.vm.$nextTick();

		expect( content.isVisible() ).toBe( false );
	} );

	// Events
	it( 'emits update:visible event when hiding dialog', () => {
		const wrapper = createWrapper();

		// TypeScript does not recognise custom methods defined on component vm
		( wrapper.vm as any ).hide();

		expect( wrapper.emitted()[ 'update:visible' ] ).toBeTruthy();
		expect( wrapper.emitted()[ 'update:visible' ]![ 0 ] ).toEqual( [ false ] );
	} );

	it( 'emits update:visible event when showing dialog', () => {
		const wrapper = createWrapper();

		// TypeScript does not recognise custom methods defined on component vm
		( wrapper.vm as any ).show();

		expect( wrapper.emitted()[ 'update:visible' ] ).toBeTruthy();
		expect( wrapper.emitted()[ 'update:visible' ]![ 0 ] ).toEqual( [ true ] );
	} );

	it( 'emits dismissed event when dismissed', () => {
		const wrapper = createWrapper();

		// TypeScript does not recognise custom methods defined on component vm
		( wrapper.vm as any ).dismiss();

		expect( wrapper.emitted().dismissed ).toBeTruthy();
	} );

	it( 'emits action event when pressing an action button', () => {
		const actions = [
			{
				label: 'CLICK ME!!!',
				namespace: 'clickety-clack',
			},
			{
				label: 'ME CLACK!!!',
				namespace: 'clackety-click',
			},
		];

		const wrapper = createWrapper( { props: { actions } } );

		actions.forEach( ( { namespace }, i ) => {
			const button = wrapper.find( `.${namespace}` );

			// Trigger click event
			button.trigger( 'click' );

			const emitted = wrapper.emitted().action;

			expect( emitted ).toBeTruthy();
			expect( emitted![ i ] ).toEqual( [ namespace, wrapper.vm ] );
		} );
	} );

	// Behaviour
	it( 'doesn\'t show dialog by default', () => {
		const wrapper = createWrapper();
		const content = wrapper.find( '.wikit-Dialog' );

		expect( wrapper.props().visible ).toBe( false );
		expect( content.isVisible() ).toBe( false );
	} );

	it( 'dismisses when pressing the close button', async () => {
		const wrapper = createWrapper( {
			props: {
				visible: true,
				dismissButton: true,
			},
		} );
		const content = wrapper.find( '.wikit-Dialog' );

		const button = wrapper.find( '.wikit-Dialog__close' );
		// Trigger click event
		button.trigger( 'click' );

		await wrapper.vm.$nextTick();
		expect( wrapper.emitted().dismissed ).toBeTruthy();
		expect( content.isVisible() ).toBe( false );
	} );

	it( 'dismisses when pressing the overlay', async () => {
		const wrapper = createWrapper( {
			props: { visible: true },
		} );
		const content = wrapper.find( '.wikit-Dialog' );

		const overlay = content.find( '.wikit-Dialog__overlay' );
		// Trigger click event
		overlay.trigger( 'click' );

		await wrapper.vm.$nextTick();
		expect( wrapper.emitted().dismissed ).toBeTruthy();
		expect( content.isVisible() ).toBe( false );
	} );

	it( 'dismisses when pressing the esc key', async () => {
		const wrapper = createWrapper( {
			props: { visible: true },
			attachTo: document.body,
		} );
		const content = wrapper.find( '.wikit-Dialog' );

		wrapper.trigger( 'keydown', {
			key: 'Escape',
		} );

		await wrapper.vm.$nextTick();
		expect( wrapper.emitted().dismissed ).toBeTruthy();
		expect( content.isVisible() ).toBe( false );
	} );
} );
