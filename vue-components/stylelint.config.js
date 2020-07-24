module.exports = {
	extends: [
		'stylelint-config-standard',
	],
	plugins: [
		'stylelint-use-logical',
	],
	rules: {
		'indentation': 'tab',
		'csstools/use-logical': 'always',
	},
};
