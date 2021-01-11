describe( 'Button', function () {
	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init( client.launch_url + '/iframe.html?id=button--normal&viewMode=story' );
	} );

	afterEach( function ( client, done ) {
		client.sauceEnd();// custom command used to finish the test if running in SauceLabs
		client.end();
		done();
	} );

	it( 'is visible', function ( client ) {
		client
			.waitForElementPresent( '.wikit-Button' )
			.assert.visible( '.wikit-Button' );
	} );
} );
