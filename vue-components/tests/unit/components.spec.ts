import { mount } from '@vue/test-utils';
import * as allComponents from '@/main';

describe( 'All components', () => {
	it( 'have the class wikit in their root node', () => {
		Object.keys( allComponents ).forEach( ( component ) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			const wrapper = mount( allComponents[ component ] ); // { ComponentName: VueConstructor<Vue>; }
			expect( wrapper.classes() ).toContain( 'wikit' );
		} );
	} );
} );
