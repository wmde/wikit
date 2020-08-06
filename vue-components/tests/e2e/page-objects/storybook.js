/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.storybook.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */

module.exports = {
	url: '/',
	commands: [],

	// A page object can have elements
	elements: {
		appContainer: {
			selector: '#root', // Storybook's root node
		},
	},

	// Or a page objects can also have sections
	sections: {
		app: {
			selector: '.wikit-HelloWorld',

			// - a page object section can also have sub-sections
			// - elements or sub-sections located here are retrieved using the "app" section as the base
			sections: {
				headline: {
					selector: 'h3',
				},

				list: {
					selector: 'ul',

					elements: {
						readme: {
							selector: 'li',
							index: 0,
						},
					},
				},
			},
		},
	},
};
