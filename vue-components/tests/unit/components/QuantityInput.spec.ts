import { shallowMount } from '@vue/test-utils';
import QuantityInput from '@/components/QuantityInput.vue';
import Input from '@/components/Input.vue';
import LookupInput from '@/components/LookupInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';

describe( 'QuantityInput', () => {
	describe( ':props', () => {
		it( ':label - renders a single label that is connected to the number input', () => {
			const testLabel = 'Lorem Ipsum';
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: testLabel,
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );

			const componentLabel = wrapper.find( 'label' );
			expect( componentLabel.text() ).toBe( testLabel );
			expect( componentLabel.attributes( 'for' ) )
				.toBe( wrapper.findComponent( Input ).attributes( 'id' ) );
		} );

		it( ':disabled - disables both number Input and unit LookupInput', async () => {
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );

			expect( wrapper.findComponent( Input ).attributes( 'disabled' ) ).toBe( undefined );
			expect( wrapper.findComponent( LookupInput ).props( 'disabled' ) ).toBe( false );

			await wrapper.setProps( { disabled: true } );

			expect( wrapper.findComponent( Input ).attributes( 'disabled' ) ).toBe( 'true' );
			expect( wrapper.findComponent( LookupInput ).props( 'disabled' ) ).toBe( true );
		} );

		it( ':numberInputPlaceholder - passes the given placeholder down to the number input', () => {
			const testPlaceholder = 'Lorem Ipsum';
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: testPlaceholder,
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );

			expect( wrapper.findComponent( Input ).attributes( 'placeholder' ) ).toBe( testPlaceholder );
		} );

		it( ':unitLookupLabel - passes the given label down to the LookupInput as aria-label', () => {
			const testLabel = 'Lorem Ipsum';
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: testLabel,
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );

			expect( wrapper.findComponent( LookupInput ).attributes( 'aria-label' ) ).toBe( testLabel );
		} );

		it( ':unitLookupPlaceholder - passes the given placeholder down to the LookupInput', () => {
			const testPlaceholder = 'Lorem Ipsum';
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: testPlaceholder,
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );

			expect( wrapper.findComponent( LookupInput ).props( 'placeholder' ) ).toBe( testPlaceholder );
		} );

		it( ':unitLookupMenuItems - passes the given MenuItems down to the LookupInput', () => {
			const testMenuItems = [ {
				label: 'Meter',
				id: 'Q4321',
				description: 'SI-Unit of length',
			} ];
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: testMenuItems,
					unitLookupSearchInput: '',
				},
			} );

			// FIXME: should this component have prop-validation for unitLookupMenuItems? Probably not
			expect( wrapper.findComponent( LookupInput ).props( 'menuItems' ) ).toBe( testMenuItems );
		} );

		it( ':unitLookupSearchInput - passes the given searchInput down to the LookupInput', () => {
			const testSearchInput = 'Lorem Ipsum';
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: testSearchInput,
				},
			} );

			expect( wrapper.findComponent( LookupInput ).props( 'searchInput' ) ).toBe( testSearchInput );
		} );

		it( ':unitLookupValue - passes the selected MenuItem back down to the LookupInput', () => {
			const testMenuItems = [ {
				label: 'Kilogram',
				id: 'Q789',
				description: 'SI-Unit of weight',
			}, {
				label: 'Meter',
				id: 'Q4321',
				description: 'SI-Unit of length',
			} ];
			const testUnitValue = {
				label: 'Kilogram',
				id: 'Q789',
				description: 'SI-Unit of weight',
			};
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupValue: testUnitValue,
					unitLookupMenuItems: testMenuItems,
					unitLookupSearchInput: '',
				},
			} );

			expect( wrapper.findComponent( LookupInput ).props( 'value' ) ).toBe( testUnitValue );
		} );

		it( ':numberInputValue - passes the entered text back down to the Input', () => {
			const testNumberInputValue = '123';
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					numberInputValue: testNumberInputValue,
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );

			expect( wrapper.findComponent( Input ).attributes( 'value' ) ).toBe( testNumberInputValue );
		} );

		it( ':error - shows the error in the ValidationMessage', async () => {
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );
			const testError = { type: 'error', message: 'Something went wrong!' };

			expect( wrapper.findComponent( ValidationMessage ).exists() ).toBe( false );

			await wrapper.setProps( { error: testError } );

			expect( wrapper.findComponent( ValidationMessage ).exists() ).toBe( true );
			expect( wrapper.findComponent( ValidationMessage ).props( 'type' ) ).toBe( testError.type );
			expect( wrapper.findComponent( ValidationMessage ).props( 'message' ) ).toBe( testError.message );
		} );

		it( ':errorCause - passes the error type to the respective input', async () => {
			const testError = { type: 'error', message: 'Something went wrong!' };
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					error: testError,
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );

			expect( wrapper.findComponent( Input ).props( 'feedbackType' ) ).toBe( null );
			expect( wrapper.findComponent( LookupInput ).props( 'feedbackType' ) ).toBe( null );

			await wrapper.setProps( { errorCause: 'number' } );

			expect( wrapper.findComponent( Input ).props( 'feedbackType' ) ).toBe( testError.type );
			expect( wrapper.findComponent( LookupInput ).props( 'feedbackType' ) ).toBe( null );

			await wrapper.setProps( { errorCause: 'unit' } );

			expect( wrapper.findComponent( Input ).props( 'feedbackType' ) ).toBe( null );
			expect( wrapper.findComponent( LookupInput ).props( 'feedbackType' ) ).toBe( testError.type );

			await wrapper.setProps( { errorCause: 'both' } );
			expect( wrapper.findComponent( Input ).props( 'feedbackType' ) ).toBe( testError.type );
			expect( wrapper.findComponent( LookupInput ).props( 'feedbackType' ) ).toBe( testError.type );
		} );
	} );

	describe( '@events', () => {
		it( '@update:unitLookupValue - bubbles the `input` event with an Item-value from the LookupInput', () => {
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );
			const selectedUnitItem = {
				label: 'Meter',
				id: 'Q4321',
				description: 'SI-Unit of length',
			};

			wrapper.findComponent( LookupInput ).vm.$emit( 'input', selectedUnitItem );

			expect( wrapper.emitted( 'update:unitLookupValue' )![ 0 ] ).toStrictEqual( [ selectedUnitItem ] );
		} );

		it( '@update:unitLookupValue - bubbles the `input` event with a null-value from the LookupInput', () => {
			const wrapper = shallowMount( QuantityInput, {
				propsData: {
					label: '',
					numberInputPlaceholder: '',
					unitLookupLabel: '',
					unitLookupPlaceholder: '',
					unitLookupMenuItems: [],
					unitLookupSearchInput: '',
				},
			} );
			const selectedUnitItem = null;

			wrapper.findComponent( LookupInput ).vm.$emit( 'input', selectedUnitItem );

			expect( wrapper.emitted( 'update:unitLookupValue' )![ 0 ] ).toStrictEqual( [ selectedUnitItem ] );
		} );

		it(
			'@update:unitLookupSearchInput - bubbles the "update:searchInput"-event from the LookupInput',
			() => {
				const wrapper = shallowMount( QuantityInput, {
					propsData: {
						label: '',
						numberInputPlaceholder: '',
						unitLookupLabel: '',
						unitLookupPlaceholder: '',
						unitLookupMenuItems: [],
						unitLookupSearchInput: '',
					},
				} );
				const searchInput = 'LoremIpsum';

				wrapper.findComponent( LookupInput ).vm.$emit( 'update:searchInput', searchInput );

				expect( wrapper.emitted( 'update:unitLookupSearchInput' )![ 0 ] ).toStrictEqual( [ searchInput ] );
			},
		);

		it(
			'@update:numberInputValue - bubbles the `input` event with the number as string from the Input',
			() => {
				const wrapper = shallowMount( QuantityInput, {
					propsData: {
						label: '',
						numberInputPlaceholder: '',
						unitLookupLabel: '',
						unitLookupPlaceholder: '',
						unitLookupMenuItems: [],
						unitLookupSearchInput: '',
					},
				} );
				const enteredNumberText = '123';

				wrapper.findComponent( Input ).vm.$emit( 'input', enteredNumberText );

				expect( wrapper.emitted( 'update:numberInputValue' )![ 0 ] ).toStrictEqual( [ enteredNumberText ] );
			},
		);

	} );
} );
