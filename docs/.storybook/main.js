module.exports = {
	stories: [ '../src/**/*.stories.(js)' ],
	addons: [
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
	],
};
