/* eslint-disable @typescript-eslint/indent, indent */
module.exports = {
	'default e2e tests': ( browser ) => {
		browser
			.init()
			.waitForElementVisible( '#root' ) // Storybook's root node
			.frame( 0 )
				.assert.elementPresent( '.wikit-HelloWorld' )
			.end();
	},

	'example e2e test using a custom command': ( browser ) => {
		browser
			.openStorybook()
			.frame( 0 )
				.assert.elementPresent( '.wikit-HelloWorld' )
			.end();
	},
};
