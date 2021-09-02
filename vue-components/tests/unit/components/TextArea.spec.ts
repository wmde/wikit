import { mount } from '@vue/test-utils';
import TextArea from '@/components/TextArea.vue';
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

	it( 'accepts placeholder property', () => {
		const placeholder = 'This is a placeholder';
		const wrapper = mount( TextArea, {
			propsData: { placeholder },
		} );

		expect( wrapper.find( 'textarea' ).attributes( 'placeholder' ) ).toBe( placeholder );
	} );

	it( 'should emit a change event with textarea value', () => {
		const userInput = 'hello';
		const wrapper = mount( TextArea );

		wrapper.find( 'textarea' ).setValue( userInput );
		expect( wrapper.emitted( 'input' )![ 0 ] ).toEqual( [ userInput ] );
	} );
} );
