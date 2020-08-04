const postcss = require( 'postcss' );
const wikitScope = require( '../../../build/postcssWikitScope' );

async function processWithPlugin( input: string ): Promise<{ css: string }> {
	return postcss( [ wikitScope ] ).process( input, { from: undefined } );
}

describe( 'postcssWikitScope', () => {

	it.each( [
		[
			'.foo {}',
			'.wikit .foo, .foo.wikit {}',
		],
		[
			'::before {}',
			'.wikit ::before, .wikit::before {}',
		],
		[
			'[type="button"] {}',
			'.wikit [type="button"], .wikit[type="button"] {}',
		],
		[
			'div [type=button] {}',
			'.wikit div [type=button], div.wikit [type=button] {}',
		],
		[
			'.foo a:hover {}',
			'.wikit .foo a:hover, .foo.wikit a:hover {}',
		],
		[
			'a:hover {}',
			'.wikit a:hover, a.wikit:hover {}',
		],
	] )( 'applies .wikit scoping', async ( input, expected ) => {
		const { css } = await processWithPlugin( input );
		expect( css ).toEqual( expected );
	} );

} );
