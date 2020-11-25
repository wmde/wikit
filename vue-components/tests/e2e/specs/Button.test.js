describe( 'Button', function () {
	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init( client.launch_url + '/iframe.html?id=button--normal&viewMode=story' )
	} );

	it( 'is visible', function ( client ) {
		client
			.waitForElementPresent( '.wikit-Button' )
			.assert.visible( '.wikit-Button' );
	} );
} );
