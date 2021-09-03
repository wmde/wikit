import { mount } from '@vue/test-utils';
import TextArea from '@/components/TextArea.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import { ResizeLimit } from '@/components/ResizeLimit.ts';

describe( 'TextArea.vue', () => {
	it( 'accepts rows property', () => {
		const wrapper = mount( TextArea, {
			propsData: { rows: 42 },
		} );

		expect( wrapper.props().rows ).toBe( 42 );
		expect( wrapper.find( 'textarea' ).attributes( 'rows' ) ).toBe( '42' );
	} );

	it( 'accepts a read-only property', () => {
		const wrapper = mount( TextArea, {
			propsData: { readOnly: true },
		} );

		expect( wrapper.props().readOnly ).toBe( true );
		expect( wrapper.find( 'textarea' ).attributes( 'readonly' ) ).toBeDefined();
	} );

	it( 'accepts resize property', () => {
		const wrapper = mount( TextArea, {
			propsData: { resize: ResizeLimit.Horizontal },
		} );

		expect( wrapper.props().resize ).toBe( ResizeLimit.Horizontal );
		expect( wrapper.find( 'textarea' ).classes() ).toContain( 'wikit-TextArea__textarea--horizontal' );
	} );

	it( 'uses default resize value', () => {
		const wrapper = mount( TextArea );

		expect( wrapper.find( 'textarea' ).classes() ).toContain( 'wikit-TextArea__textarea--vertical' );
	} );

	it( 'throws on invalid resize values', () => {
		expect( () => mount( TextArea, {
			propsData: { resize: 'nonsense' },
		} ) ).toThrow( 'Invalid prop: custom validator check failed for prop "resize"' );
	} );

	it( 'accepts a textarea value', () => {
		const value = 'Some beautiful value!';
		const wrapper = mount( TextArea, {
			propsData: { value },
		} );
		const element = wrapper.find( 'textarea' ).element as HTMLFormElement;

		expect( wrapper.props().value ).toBe( value );
		expect( element.value ).toBe( value );
	} );

	it( 'accepts label property', () => {
		const label = 'da Label';
		const wrapper = mount( TextArea, {
			propsData: { label },
		} );

		expect( wrapper.props().label ).toBe( label );
		expect( wrapper.find( 'label' ).text() ).toBe( label );
	} );

	it( 'accepts an error prop', () => {
		const validation = {
			type: 'warning',
			message: 'things don\'t work'
		}

		const wrapper = mount( TextArea, {
			propsData: { error: validation },
		} );

		const validationMessage = wrapper.findComponent( ValidationMessage );

		expect( wrapper.props().error ).toBe( validation );
		expect( validationMessage.props( 'message' ) ).toBe( validation.message );
		expect( validationMessage.props( 'type' ) ).toBe( validation.type );
	} );

	it( 'does not render validation message when error is not set', () => {
		const wrapper = mount( TextArea );

		expect( wrapper.findComponent( ValidationMessage ).exists() ).toBe( false );
	} );

	it( 'accepts placeholder property', () => {
		const placeholder = 'This is a placeholder';
		const wrapper = mount( TextArea, {
			propsData: { placeholder },
		} );

		expect( wrapper.find( 'textarea' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'accepts loading property', () => {
		const loading = true;
		const wrapper = mount( TextArea, {
			propsData: { loading },
		} );

		expect( wrapper.props().loading ).toBe( loading );
		expect( wrapper.find( '.wikit-TextArea__progress' ).exists() ).toBe( true );
		expect( wrapper.find( 'textarea' ).attributes( 'readonly' ) ).toBeDefined();
	} );

	it( 'does not render progress bar when loading is set to false', () => {
		const loading = false;
		const wrapper = mount( TextArea, {
			propsData: { loading },
		} );

		expect( wrapper.find( '.wikit-TextArea__progress' ).exists() ).toBe( false );
	} );

	it( 'should emit a change event with textarea value', () => {
		const userInput = 'hello';
		const wrapper = mount( TextArea );

		wrapper.find( 'textarea' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ userInput ] );
	} );
} );
