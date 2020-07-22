module.exports = {
	plugins: [
		require( 'autoprefixer' ),
		require( 'postcss-prefixwrap' )( '.wikit' ),
	],
};
