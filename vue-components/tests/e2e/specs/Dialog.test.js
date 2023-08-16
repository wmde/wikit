/**
 * Gets the WebElement ID from the result of a `client.activeElement` call.
 * In chrome,  result.value always has an `ELEMENT` key, whereas in other browser it
 * has a different format with varying keys. This function assumes that `result.value`
 * is always an object with a single entry.
 *
 * @param {Object} result
 * @return {string}
 */
function getWebElementIdFromActiveElementResult( result ) {
	return Object.values( result.value )[ 0 ];
}

describe( 'Dialog', function () {

	beforeEach( function ( client ) {
		client
			.pause( 500 )
			.init( client.launch_url + '/iframe.html?id=dialog--complex&viewMode=story' )
			.waitForElementPresent( '.wikit-Button' );
	} );

	afterEach( function ( client, done ) {
		client.sauceEnd();// custom command used to finish the test if running in SauceLabs
		client.end();
		done();
	} );

	it( 'traps page focus, so that only visually focused elements are tab-able', function ( client ) {
		client
			.click( '.wikit-Button' )
			.pause( 500 )
			.waitForElementPresent( '.wikit-Dialog' )
			.sendKeysToActiveElement( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( getWebElementIdFromActiveElementResult( result ), ( element ) => {
					const elementText1 = element.value.replace( /\s+/g, ' ' ).trim();
					client.assert.equal( elementText1, 'Primary action' );
				} );
			} )
			.sendKeysToActiveElement( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( getWebElementIdFromActiveElementResult( result ), ( element ) => {
					const elementText2 = element.value.replace( /\s+/g, ' ' ).trim();
					client.assert.equal( elementText2, 'Secondary action' );
				} );
			} )
			.sendKeysToActiveElement( client.Keys.TAB )
			.sendKeysToActiveElement( client.Keys.TAB )
			.elementActive( function ( result ) {
				client.elementIdText( getWebElementIdFromActiveElementResult( result ), ( element ) => {
					const elementText3 = element.value.replace( /\s+/g, ' ' ).trim();
					client.assert.equal( elementText3, 'Primary action' );
				} );
			} );
	} );

	it( 'prevents underlying page from scrolling when opened and on initial render', function ( client ) {
		client
			.execute( 'document.body.style.height = "150vh";' )
			.execute( 'window.scrollTo( 0, document.body.scrollHeight );' )
			.execute( 'return document.documentElement.scrollHeight > document.documentElement.clientHeight;',
				function ( result ) {
					this.assert.ok( result.value === true, 'body shows scrollbars' );
				} )
			.click( '.wikit-Button' )
			.pause( 250 )
			.execute( 'return document.documentElement.scrollHeight > document.documentElement.clientHeight;',
				function ( result ) {
					this.assert.not.ok( result.value === false, 'body does not show scrollbars' );
				} );
	} );

	it( 'resets dialog scroll bars to top when closed and reopened', function ( client ) {
		client
			.click( '.wikit-Button' )
			.pause( 500 )
			.waitForElementPresent( '.wikit-Dialog' )
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
