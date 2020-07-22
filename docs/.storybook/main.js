module.exports = {
	stories: [ '../src/**/*.stories.@(js|mdx)' ],
	addons: [ '@storybook/addon-docs' ],
	refs: {
		vue: {
			title: 'vue components',
			url: 'https://5f186840fbe1720022e1ee98-dxykdieita.chromatic.com', // 'http://localhost:6005',
		},
	},
};
