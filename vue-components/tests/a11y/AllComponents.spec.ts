import { mount } from '@vue/test-utils';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Input from '@/components/Input.vue';
import Lookup from '@/components/Lookup.vue';
import LookupInput from '@/components/LookupInput.vue';
import Message from '@/components/Message.vue';
import OptionsMenu from '@/components/OptionsMenu.vue';
import TextInput from '@/components/TextInput.vue';
import ValidationMessage from '@/components/ValidationMessage.vue';
import { axe, toHaveNoViolations } from 'jest-axe';

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

describe( 'Icon', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const wrapper = mount( Icon, {
			props: {
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
			props: {
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

describe( 'Lookup', () => {

	it( 'should not have obvious accessibility issues', async () => {
		const menuItems = [
			{ label: 'potato', description: 'root vegetable' },
			{ label: 'duck', description: 'aquatic bird' },
		];
		const wrapper = mount( Lookup, {
			props: {
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
			props: {
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
		const wrapper = mount( OptionsMenu, { props: { menuItems } } );
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
			props: {
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
			props: {
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
