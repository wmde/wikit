const wikitScope = require( './build/postcssWikitScope' );

module.exports = {
	plugins: [
		require( 'autoprefixer' ),
		wikitScope,
		require( 'postcss-logical' )( { preserve: true } ),
		require( 'postcss-dir-pseudo-class' ),
	],
};
