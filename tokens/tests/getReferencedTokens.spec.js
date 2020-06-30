'use strict';

const { getReferencedTokens } = require( '../.style-dictionary/lib' );

describe( 'getReferencedTokens', () => {
	it.each( [
		[ '#fff', [] ],
		[ '{wmf-wmui-color-base0.value}', [ 'wmf-wmui-color-base0' ] ],
		[
			'{wmf-border-width-base.value} {wmf-border-style-base.value}',
			[ 'wmf-border-width-base', 'wmf-border-style-base' ],
		],
		[ '    {    wmf-silly-whitespace.value }', [ 'wmf-silly-whitespace' ] ],
	] )( 'extracts tokens from %s: %p', ( original, expectedTokens ) => {
		expect( getReferencedTokens( { original: { value: original } } ) )
			.toEqual( { tokens: expectedTokens } );
	} );
} );
