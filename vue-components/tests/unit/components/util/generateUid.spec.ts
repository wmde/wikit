import generateUid from '@/components/util/generateUid';

describe( 'generateUid', () => {

	it( 'generates an id prefixed with the component name', () => {
		const componentName = 'my-component';
		expect( generateUid( componentName ) ).toMatch( new RegExp( `${componentName}-\\d+` ) );
	} );

	it( 'does not produce the same id twice', () => {
		const componentName = 'my-other-component';
		expect( generateUid( componentName ) ).not.toEqual( generateUid( componentName ) );
	} );

} );
