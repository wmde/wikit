module.exports = {
	'Button is visible': ( client ) => {
		client
			.url( client.launch_url + '/iframe.html?id=button--normal&viewMode=story' )
			.waitForElementPresent( '.wikit-Button' )
			.assert.visible( '.wikit-Button' );
	},
};
