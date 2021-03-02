describe( 'Lookup Menu', function () {

	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init( client.launch_url + '/iframe.html?id=lookup-lookup&viewMode=story' )
			.waitForElementPresent( '.wikit-Lookup' );
	} );

	afterEach( function ( client, done ) {
		client.sauceEnd();// custom command used to finish the test if running in SauceLabs
		client.end();
		done();
	} );

	it( 'shows on user input', function ( client ) {
		client
			.setValue( 'input', 'potato' )
			.waitForElementPresent( '.wikit-OptionsMenu' )
			.assert.visible( '.wikit-OptionsMenu' );
	} );

	it( 'displays no-results text on no matches found', function ( client ) {
		client
			.setValue( 'input', 'whatever' )
			.waitForElementPresent( '.wikit-OptionsMenu' )
			.assert.containsText( '.wikit-OptionsMenu__no-results', 'No match was found' );
	} );

	it( 'selects menu item when OptionsMenu-Item clicked', function ( client ) {
		client
			.setValue( 'input', 'potato' )
			.waitForElementPresent( '.wikit-OptionsMenu' )
			.assert.visible( '.wikit-OptionsMenu__item' )
			.click( '.wikit-OptionsMenu__item' )
			.assert.containsText( '.selected-item-label', 'potato' )
			.assert.containsText( '.selected-item-id', 'Q10998' );
	} );

	it( 'emits first and last index on scroll change', function ( client ) {
		client
			.setValue( 'input', 'a' )
			.waitForElementPresent( '.wikit-OptionsMenu' )
			.execute( 'document.querySelectorAll(".wikit-OptionsMenu__item")[7].scrollIntoView(false)' )
			.assert.containsText( '.first-visible-element-index', '2' )
			.assert.containsText( '.last-visible-element-index', '7' );
	} );
} );
