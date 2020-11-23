describe( 'Lookup Menu', function () {

	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init()
			.openComponentStoryDirectory( 'lookup' )
			.openComponentStory( 'lookup-lookup' )
			.waitForElementPresent( '.wikit-Lookup' );
	} );

	it( 'shows on user input', function ( client ) {
		client
			.setValue( 'input', 'potato' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.visible( '.wikit-Lookup__menu' );
	} );

	it( 'displays no-results text on no matches found', function ( client ) {
		client
			.setValue( 'input', 'whatever' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.containsText( '.wikit-LookupMenu__no-results', 'No match was found' );
	} );

	it( 'selects menu item when LookupMenu-Item clicked', function ( client ) {
		client
			.setValue( 'input', 'potato' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.visible( '.wikit-LookupMenu__item' )
			.click( '.wikit-LookupMenu__item' )
			.assert.containsText( '.selected-item-label', 'potato' )
			.assert.containsText( '.selected-item-id', 'Q10998' );
	} );

	it( 'emits first and last index on scroll change', function ( client ) {
		client
			.setValue( 'input', 'a' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.execute( 'document.querySelectorAll(".wikit-LookupMenu__item")[7].scrollIntoView(false)' )
			.assert.containsText( '.first-visible-element-index', '2' )
			.assert.containsText( '.last-visible-element-index', '7' );
	} );
} );
