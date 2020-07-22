module.exports = {
	stories: [ '../src/**/*.stories.@(js|mdx)' ],
	addons: [ '@storybook/addon-docs' ],
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
};
