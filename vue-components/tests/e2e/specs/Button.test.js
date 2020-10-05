module.exports = {
	'Button is visible': ( client ) => {
		client
			.init()
			.openComponentStory( 'button' )
			.waitForElementPresent( '.wikit-Button' )
			.assert.elementPresent( '.wikit-Button' );
	},
};
