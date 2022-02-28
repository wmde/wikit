module.exports = {
	extends: [
		'stylelint-config-sass-guidelines',
	],
	plugins: [
		'stylelint-use-logical-spec',
	],
	rules: {
		'indentation': 'tab',
		'liberty/use-logical-spec': [ 'always', {
			except: [ /\b(width|height)$/ ],
		} ],
		/* eslint-disable */
		// CSS Logical Properties do not support the shorthand 'margin' and 'padding' yet
		// https://wmde.github.io/wikit/?path=/story/documentation-decisions-and-adrs-adrs-9-rtl-support--page#consequences
		'max-nesting-depth': 3,
		'order/properties-alphabetical-order' : null,
		'property-disallowed-list': [ '/^margin$/', '/^padding$/' ],
		'selector-class-pattern': null,	
	},
};
