require( '@rushstack/eslint-patch/modern-module-resolution' );

module.exports = {
	extends: [
		'wikimedia',
		'wikimedia/language/rules-es2017', // the not-* parts are obsolete after transpiling and polyfills
		'plugin:vue/strongly-recommended',
		'@wmde/wikimedia-typescript',
	],
	plugins: [
		'filenames',
		'vue-root-class',
	],
	parser: 'vue-eslint-parser',
	env: {
		browser: true,
	},
	root: true,
	rules: {
		// This would be the right thing to do, but too late now
		'vue/multi-word-component-names': 'off',

		'function-paren-newline': [ 'error', 'consistent' ],
		'filenames/match-exported': 'error',
		'object-shorthand': [ 'error', 'always' ],

		// diverging from Wikimedia rule set
		'max-len': [ 'error', 120 ],
		'comma-dangle': [ 'error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'always-multiline',
		} ],
		'operator-linebreak': 'off',
		'quote-props': 'off',
		'valid-jsdoc': 'off',

		'vue/html-indent': [ 'error', 'tab' ],
		'vue/max-attributes-per-line': [ 'error', {
			singleline: 3,
			multiline: {
				max: 1,
			},
		} ],

		// duplicate with @typescript-eslint/indent
		'indent': 'off',

		// required
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-var-requires': 'off',

		// we prefer expect().toHaveBeenCalled* over toBeCalled*
		'no-restricted-properties': [
			'error',
			{
				property: 'toBeCalled',
				message: 'Please use toHaveBeenCalled instead.',
			},
			{
				property: 'toBeCalledTimes',
				message: 'Please use toHaveBeenCalledTimes instead.',
			},
			{
				property: 'toBeCalledWith',
				message: 'Please use toHaveBeenCalledWith instead.',
			},
			{
				property: 'lastCalledWith',
				message: 'Please use toHaveBeenLastCalledWith instead.',
			},
			{
				property: 'nthCalledWith',
				message: 'Please use toHaveBeenNthCalledWith instead.',
			},
			{
				property: 'toReturn',
				message: 'Please use tohaveReturned instead.',
			},
			{
				property: 'toReturnTimes',
				message: 'Please use toHaveReturnedTimes instead.',
			},
			{
				property: 'toReturnWith',
				message: 'Please use toHaveReturnedTimes instead.',
			},
			{
				property: 'lastReturnedWith',
				message: 'Please use toHaveLastReturnedWith instead.',
			},
			{
				property: 'nthReturnedWith',
				message: 'Please use toHaveNthReturnedWith instead.',
			},
		],
		'vue-root-class/vue-root-class': [ 'error', { class: 'wikit' } ],
	},
	overrides: [
		{
			files: [ '**/*.ts' ],
			parser: 'vue-eslint-parser',
			rules: {
				'no-undef': 'off',
			},
		},
		{
			files: [ '*.js' ],
			extends: [
				'wikimedia/node',
			],
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-member-accessibility': 'off',
			},
		},
	],
};
