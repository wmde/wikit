module.exports = {
	plugins: [
		require( 'autoprefixer' ),
		require( 'postcss-prefixwrap' )( '.wikit' ),
		require( 'postcss-logical' )( { preserve: true } ),
		require( 'postcss-dir-pseudo-class' ),
	],
};
