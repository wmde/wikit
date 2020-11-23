describe( 'Button', function () {
	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init()
			.openComponentStory( 'button' );
	} );

	it( 'is visible', function ( client ) {
		client
			.waitForElementPresent( '.wikit-Button' )
			.assert.visible( '.wikit-Button' );
	} );
} );
