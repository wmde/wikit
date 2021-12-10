module.exports = {
	rules: {
		'max-len': 'off', // lots of long lines due to inline templates
		'no-restricted-imports': [ // force component imports from src/main.ts to remember exporting
			'error',
			{ patterns: [ '@/components/*', '../src/components/*' ] },
		],
	},
};
