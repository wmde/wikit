module.exports = {
	'Button is visible': ( client ) => {
		client
			.init()
			.openComponentStory( 'button' )
			.waitForElementVisible( '.wikit-Button' )
			.assert.elementPresent( '.wikit-Button' );
	},
};
