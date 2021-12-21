describe( 'Dialog', function () {

	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init( client.launch_url + '/iframe.html?id=dialog--complex&viewMode=story' )
			// focus button to open Dialog
			.sendKeys( 'body', client.Keys.TAB )
			.execute( 'document.body.style.height = "150vh";' )
			.execute( 'window.scrollTo( 0, document.body.scrollHeight );' )
			// hit enter to open Dialog after scroll. a click brings the button back into focus
			.sendKeys( '.wikit-Button', client.Keys.ENTER )
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
			.sendKeysToActiveElement( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( result.value.ELEMENT, ( element ) => {
					client.assert.equal( element.value, 'Primary action' );
				} );
			} )
			.sendKeysToActiveElement( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( result.value.ELEMENT, ( element ) => {
					// this one is to make sure that the tab is working
					client.assert.equal( element.value, 'Secondary action' );
				} );
			} )
			// makes sure it goes back to the first element after three tabs
			.sendKeysToActiveElement( client.Keys.TAB )
			.sendKeysToActiveElement( client.Keys.TAB )
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

	it( 'resets dialog scroll bars to top when closed and reopened', function ( client ) {

		client
			// substract 100px from the dialog's original height so scrollbars are shown
			.execute( `document.querySelector( ".wikit-Dialog__modal" ).style.height =
				document.querySelector( ".wikit-Dialog__modal" ).offsetHeight - 100 + "px"` )
			.execute( `document.querySelector(".wikit-Dialog__content" )
				.scrollTo( 0, document.querySelector(".wikit-Dialog__content").scrollHeight)` )
			.click( '.wikit-Dialog__close' )
			// wait for animation
			.pause( 500 )
			.click( '.wikit-Button' )
			// wait for animation
			.pause( 500 )
			.execute( 'return document.querySelector(".wikit-Dialog__content" ).scrollTop',
				function ( result ) {
					this.assert.ok( result.value === 0, 'dialog scrollbar is positioned at 0' );
				} );
	} );
} );
