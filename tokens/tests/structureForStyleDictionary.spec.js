'use strict';

const { structureForStyleDictionary } = require( './../build/wikimedia-ui-base/lib' );

describe( 'structureForStyleDictionary', () => {
	it( 'prefixes imported variables', () => {
		expect( structureForStyleDictionary(
			{
				foo: 'bar',
				'baz--lorem': 5,
			},
			'wmf-',
		) ).toEqual( {
			'wmf-foo': {
				value: 'bar',
				comment: 'WMF import: @foo',
			},
			'wmf-baz--lorem': {
				value: 5,
				comment: 'WMF import: @baz--lorem',
			},
		} );
	} );
} );
