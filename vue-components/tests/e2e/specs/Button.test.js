module.exports = {
	'default e2e tests': ( client ) => {
		client
			.init()
			.openComponentStory( 'button' )
			.waitForElementVisible( '.wikit-Button' )
			.assert.elementPresent( '.wikit-Button' )
			.end();
	},
};
