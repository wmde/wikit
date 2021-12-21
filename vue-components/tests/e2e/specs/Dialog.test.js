describe( 'Dialog', function () {

	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init( client.launch_url + '/iframe.html?id=dialog--complex&viewMode=story' )
			// focus button to open Dialog
			.keys( client.Keys.TAB )
			.execute( 'document.body.style.height = "150vh";' )
			.execute( 'window.scrollTo( 0, document.body.scrollHeight );' )
			// hit enter to open Dialog after scroll. a click brings the button back into focus
			.keys( client.Keys.ENTER )
			.pause( 500 )
			.waitForElementPresent( '.wikit-Dialog' );
	} );

	afterEach( function ( client, done ) {
		client.sauceEnd();// custom command used to finish the test if running in SauceLabs
		client.end();
		done();
	} );

	it( 'traps page focus, so that only visually focused elements are tab-able', function ( client ) {
		client
			.keys( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( result.value.ELEMENT, ( element ) => {
					client.assert.equal( element.value, 'Primary action' );
				} );
			} )
			.keys( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( result.value.ELEMENT, ( element ) => {
					// this one is to make sure that the tab is working
					client.assert.equal( element.value, 'Secondary action' );
				} );
			} )
			// makes sure it goes back to the first element after three tabs
			.keys( client.Keys.TAB )
			.keys( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( result.value.ELEMENT, ( element ) => {
					client.assert.equal( element.value, 'Primary action' );
				} );
			} );
	} );

	it( 'prevents underlying page from scrolling when opened and on initial render', function ( client ) {

		client
			// make sure we have scrolled down the top of the page
			.assert.not.visible( '#root > div > .wikit-Button' )
			.execute( 'return document.documentElement.scrollHeight > document.documentElement.clientHeight;',
				function ( result ) {
					this.assert.not.ok( result.value === false, 'body does not show scrollbars' );
				} );
	} );
} );
