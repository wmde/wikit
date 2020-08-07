import { mount } from '@vue/test-utils';
import * as allComponents from '@/main';

describe( 'All components', () => {
	it( 'have the class wikit in their root node', () => {
		Object.values( allComponents ).forEach( ( component ) => {
			const wrapper = mount( component );
			expect( wrapper.classes() ).toContain( 'wikit' );
		} );
	} );
} );
