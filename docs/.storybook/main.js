module.exports = {
	stories: [ '../src/**/*.stories.(js|mdx)' ],
	addons: [
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
		'@storybook/addon-knobs/register',
		'@storybook/addon-a11y/register',
	],
};
