module.exports = {
	'Button is visible': ( client ) => {
		client
			.pause( 500 )
			.init()
			.openComponentStory( 'button' )
			.waitForElementPresent( '.wikit-Button' )
			.assert.visible( '.wikit-Button' );
	},
};
