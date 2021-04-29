import { mount, createLocalVue } from '@vue/test-utils';
import Button from '@/components/Button.vue';
import DateInput from '@/components/DateInput.vue';
import Dropdown from '@/components/Dropdown.vue';
import ExtendedNumberInput from '@/components/ExtendedNumberInput.vue';
import Icon from '@/components/Icon.vue';
import Input from '@/components/Input.vue';
import InputWithExtender from '@/components/InputWithExtender.vue';
import Lookup from '@/components/Lookup.vue';
import LookupInput from '@/components/LookupInput.vue';
import Message from '@/components/Message.vue';
import OptionsMenu from '@/components/OptionsMenu.vue';
import Popover from '@/components/Popover.vue';
import QuantityInput from '@/components/QuantityInput.vue';
import TextInput from '@/components/TextInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import { axe, toHaveNoViolations } from 'jest-axe';

const localVue = createLocalVue();
expect.extend( toHaveNoViolations );

describe( 'Button', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( Button, {
			slots: {
				default: 'something',
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'DateInput', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( DateInput, {
			propsData: {
				value: '2020-10-10',
				label: 'a label',
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'Dropdown', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( Dropdown, {
			propsData: {
				label: 'a label',
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'ExtendedNumberInput', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( ExtendedNumberInput, {
			propsData: {
				value: '123',
				label: 'a label',
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'Icon', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( Icon, {
			propsData: {
				type: 'error',
				color: 'error',
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'Input', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( Input, {
			propsData: {
				feedbackType: null,
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
				'label': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'InputWithExtender', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( InputWithExtender, {
			propsData: {
				value: 'a value',
				label: 'a label',
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'Lookup', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( Lookup, {
			propsData: {
				label: 'a label',
				menuItems,
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'LookupInput', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( LookupInput, {
			propsData: {
				value: { label: 'duck', description: 'aquatic bird' },
				menuItems,
				searchInput: 'potato',
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
				'label': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'Message', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const message = 'hello, things went wrong.';
		const wrapper = mount( Message, {
			propsData: {
				type: 'error',
			},
			slots: {
				default: message,
			},
		} );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'OptionsMenu', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( OptionsMenu, { propsData: { menuItems } } );
		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'Popover', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( Popover, {
			propsData: {
				isShown: true,
			},
			slots: {
				default: 'some content',
			},
		} );
		await localVue.nextTick();

		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'QuantityInput', () => {

	it( 'should not have obvious accessibility issues', async () => {
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
		const wrapper = mount( QuantityInput, {
			propsData: {
				label: 'a label',
				numberInputPlaceholder: '',
				unitLookupLabel: 'another label',
				unitLookupPlaceholder: '',
				unitLookupValue: testUnitValue,
				unitLookupMenuItems: testMenuItems,
				unitLookupSearchInput: '',
			},
		} );

		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'TextInput', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( TextInput, {
			propsData: {
				value: 'a value',
				label: 'a label',
			},
		} );

		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );

describe( 'ValidationMessage', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const message = 'hello, things went wrong.';
		const wrapper = mount( ValidationMessage, {
			propsData: {
				type: 'error',
				message,
			},
		} );

		const results = await axe( wrapper.element, {
			rules: {
				'region': { enabled: false },
			},
		} );

		expect( results ).toHaveNoViolations();
	} );

} );
