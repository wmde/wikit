import { shallowMount } from '@vue/test-utils';
import QuantityInput from '@/components/QuantityInput.vue';
import Input from '@/components/Input.vue';
import Lookup from '@/components/Lookup.vue';

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

		it( ':disabled - disables both number Input and unit Lookup', async () => {
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
			expect( wrapper.findComponent( Lookup ).props( 'disabled' ) ).toBe( false );

			wrapper.setProps( { disabled: true } );
			await wrapper.vm.$nextTick();

			expect( wrapper.findComponent( Input ).attributes( 'disabled' ) ).toBe( 'true' );
			expect( wrapper.findComponent( Lookup ).props( 'disabled' ) ).toBe( true );
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

		it( ':unitLookupLabel - passes the given label down to the lookup', () => {
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

			expect( wrapper.findComponent( Lookup ).attributes( 'label' ) ).toBe( testLabel );
		} );

		it( ':unitLookupPlaceholder - passes the given placeholder down to the Lookup', () => {
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

			expect( wrapper.findComponent( Lookup ).props( 'placeholder' ) ).toBe( testPlaceholder );
		} );

		it( ':unitLookupMenuItems - passes the given MenuItems down to the Lookup', () => {
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
			expect( wrapper.findComponent( Lookup ).props( 'menuItems' ) ).toBe( testMenuItems );
		} );

		it( ':unitLookupSearchInput - passes the given searchInput down to the Lookup', () => {
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

			expect( wrapper.findComponent( Lookup ).props( 'searchInput' ) ).toBe( testSearchInput );
		} );
	} );

	describe( '@events', () => {
		it( '@update:unitLookupValue - bubbles the `input` event with an Item-value from the Lookup', async () => {
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

			wrapper.findComponent( Lookup ).vm.$emit( 'input', selectedUnitItem );
			await wrapper.vm.$nextTick();

			expect( wrapper.emitted( 'update:unitLookupValue' )![ 0 ] ).toStrictEqual( [ selectedUnitItem ] );
		} );

		it( '@update:unitLookupValue - bubbles the `input` event with a null-value from the Lookup', async () => {
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

			wrapper.findComponent( Lookup ).vm.$emit( 'input', selectedUnitItem );
			await wrapper.vm.$nextTick();

			expect( wrapper.emitted( 'update:unitLookupValue' )![ 0 ] ).toStrictEqual( [ selectedUnitItem ] );
		} );

		it(
			'@update:unitLookupSearchInput - bubbles the "update:searchInput"-event from the lookup',
			async () => {
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

				wrapper.findComponent( Lookup ).vm.$emit( 'update:searchInput', searchInput );
				await wrapper.vm.$nextTick();

				expect( wrapper.emitted( 'update:unitLookupSearchInput' )![ 0 ] ).toStrictEqual( [ searchInput ] );
			},
		);

	} );
} );
