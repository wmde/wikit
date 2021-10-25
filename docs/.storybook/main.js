const path = require( 'path' );

module.exports = {
	stories: [ '../src/**/*.stories.@(js|mdx)' ],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
	],
	refs: {
		vue: {
			title: 'vue components',
			/**
			 * Requires the vue-components storybook to be deployed as a
			 * subdirectory of the docs storybook - see commit message
			 */
			url: './vue-components',
		},
	},
	webpackFinal( config ) {
		config.module.rules.push( {
			test: /\.scss$/,
			use: [ 'style-loader', 'css-loader', 'sass-loader' ],
			include: path.resolve( __dirname, '../' ),
		} );

		return config;
	},
};
