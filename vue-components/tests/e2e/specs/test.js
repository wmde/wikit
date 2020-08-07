/* eslint-disable @typescript-eslint/indent, indent */
module.exports = {
	'default e2e tests': ( browser ) => {
		browser
			.init()
			.waitForElementVisible( '#root' ) // Storybook's root node
			.frame( 0 )
				.waitForElementVisible( '.wikit-HelloWorld' )
				.assert.elementPresent( '.wikit-HelloWorld' )
			.end();
	},
};
