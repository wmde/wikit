// //////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
// //////////////////////////////////////////////////////////////

module.exports = {
	beforeEach: ( browser ) => browser.init(),

	'e2e tests using page objects': ( browser ) => {
		const storybook = browser.page.storybook();
		storybook.waitForElementVisible( '@appContainer' );
		browser.frame( 0 );

		const app = storybook.section.app;
		app.expect.section( '@headline' ).text.to.match( /^Hello World!!1$/ );

		browser.end();
	},
};
