import { mount } from '@vue/test-utils';
import * as allComponents from '@/main';

describe( 'All components', () => {
	it( 'have the class wikit in their root node', () => {
		// props to feed to certain components so they can be built
		// TODO in order not to maintain this forever, consider switching this to an eslint-based solution
		// See https://phabricator.wikimedia.org/T267741
		const dummyProps: Record<string, object> = {
			Message: {
				type: 'success',
			},
		};
		Object.values( allComponents ).forEach( ( component ) => {
			const wrapper = mount( component, {
				propsData: dummyProps[ ( component as any ).options.name ] || {},
			} );
			expect( wrapper.classes() ).toContain( 'wikit' );
		} );
	} );
} );
