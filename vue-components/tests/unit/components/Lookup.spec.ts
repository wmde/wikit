import Vue from 'vue';
import { mount, shallowMount } from '@vue/test-utils';
import Lookup from '@/components/Lookup.vue';
import Input from '@/components/Input.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import LookupInput from '@/components/LookupInput.vue';
import OptionsMenu from '@/components/OptionsMenu.vue';

describe( 'Lookup', () => {

	it( 'passes the no-results slot to the lookup menu', async () => {
		const noResultsText = 'no results :(';
		const wrapper = mount( Lookup, {
			propsData: {
				menuItems: [],
				searchInput: 'some non-empty input',
			},
			slots: {
				'no-results': noResultsText,
			},
		} );
		wrapper.findComponent( Input ).trigger( 'focus' );

		await Vue.nextTick();

		expect( wrapper.find( '.wikit-OptionsMenu' ).text() ).toBe( noResultsText );
	} );

	describe( ':props', () => {
		it( ':label - has a label', () => {
			const label = 'a label';
			const wrapper = mount( Lookup, {
				propsData: {
					label,
				},
			} );

			expect( wrapper.find( '.wikit-Lookup__label' ).text() ).toBe( label );
		} );

		it( ':menuItems - are passed down to be shown by the OptionsMenu', () => {
			const menuItems = [
				{ label: 'potato', description: 'root vegetable' },
				{ label: 'duck', description: 'aquatic bird' },
			];
			const wrapper = mount( Lookup, { propsData: { menuItems } } );

			expect( wrapper.findComponent( OptionsMenu ).props( 'menuItems' ) ).toBe( menuItems );
		} );

		it( ':value - is the selected MenuItem, passed down to the LookupInput', async () => {
			const testValue = { label: 'duck', description: 'aquatic bird' };
			const wrapper = shallowMount( Lookup );

			wrapper.setProps( { value: testValue } );
			await Vue.nextTick();

			expect( wrapper.findComponent( LookupInput ).props( 'value' ) ).toBe( testValue );
		} );

		it( ':searchInput - is the text of the input', async () => {
			const testSearchInput = 'Lorem Ipsum';
			const wrapper = mount( Lookup );

			expect( wrapper.find( 'input' ).props( 'value' ) ).toBe( '' );

			wrapper.setProps( { searchInput: testSearchInput } );
			await Vue.nextTick();

			expect( wrapper.find( 'input' ).props( 'value' ) ).toBe( testSearchInput );
		} );

		it( ':disabled - can be disabled', () => {
			const wrapper = mount( Lookup, {
				propsData: {
					disabled: true,
				},
			} );

			expect( wrapper.find( 'input' ).attributes( 'disabled' ) ).toBeTruthy();
		} );

		it( ':placeholder - can have a placeholder', () => {
			const placeholder = 'a placeholder';
			const wrapper = mount( Lookup, {
				propsData: {
					placeholder,
				},
			} );

			expect( wrapper.find( 'input' ).attributes( 'placeholder' ) ).toBe( placeholder );
		} );

		it( ':error - rejects errors without a message', () => {
			expect( () => mount( Lookup, {
				propsData: {
					error: {
						type: 'warning',
					},
				},
			} ) ).toThrow();
		} );

		it( ':error - rejects errors without a type', () => {
			expect( () => mount( Lookup, {
				propsData: {
					error: {
						message: 'things went wrong',
					},
				},
			} ) ).toThrow();
		} );

		it( ':error - rejects invalid error types', () => {
			expect( () => mount( Lookup, {
				propsData: {
					error: {
						type: 'not-that-bad',
					},
				},
			} ) ).toThrow();
		} );

		it.each( [
			'warning',
			'error',
		] )(
			':error - passes the error to the ValidationMessage child component and the feedback type to the Input',
			( errorType ) => {
				const errorMessage = 'error!!!!';
				const wrapper = mount( Lookup, {
					propsData: {
						error: {
							type: errorType,
							message: errorMessage,
						},
					},
				} );
				const validationMessage = wrapper.findComponent( ValidationMessage );

				expect( validationMessage.props( 'message' ) ).toBe( errorMessage );
				expect( validationMessage.props( 'type' ) ).toBe( errorType );
				expect( wrapper.findComponent( Input ).props( 'feedbackType' ) ).toStrictEqual( errorType );
			},
		);
	} );

	describe( '@events', () => {
		it( '@input - bubbles the `input` containing the selected MenuItem or null', () => {
			const wrapper = shallowMount( Lookup );
			const testValue = {
				label: 'zucchini',
				description: 'Edible summer squash, typically green in colour',
				value: 'Q7533',
			};

			wrapper.findComponent( LookupInput ).vm.$emit( 'input', testValue );

			expect( wrapper.emitted( 'input' ) ).toStrictEqual( [ [ testValue ] ] );

			wrapper.findComponent( LookupInput ).vm.$emit( 'input', null );

			expect( wrapper.emitted( 'input' ) ).toStrictEqual( [ [ testValue ], [ null ] ] );
		} );

		it( '@update:searchInput - bubbles the `update:searchInput` event with changes to the Input component', () => {
			const wrapper = shallowMount( Lookup );
			const testSearchInput = 'lorem ipsum';

			wrapper.findComponent( LookupInput ).vm.$emit( 'update:searchInput', testSearchInput );

			expect( wrapper.emitted( 'update:searchInput' ) ).toStrictEqual( [ [ testSearchInput ] ] );
		} );
		it( '@scroll - bubbles the scroll event containing the currently visible indexes when they changed', () => {
			const wrapper = shallowMount( Lookup );

			wrapper.findComponent( LookupInput ).vm.$emit( 'scroll', 1, 5 );

			expect( wrapper.emitted( 'scroll' ) ).toStrictEqual( [ [ 1, 5 ] ] );
		} );
	} );
} );
