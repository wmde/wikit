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
			.init( client.launch_url + '/iframe.html?id=dialog--complex&viewMode=story' );
	} );

	afterEach( function ( client, done ) {
		client.sauceEnd();// custom command used to finish the test if running in SauceLabs
		client.end();
		done();
	} );

	it( 'traps page focus, so that only visually focused elements are tab-able', function ( client ) {
		// exclude internet explorer for now because there is a known bug in the .keys
		// and .sendKeys functions
		// ie: https://github.com/nightwatchjs/nightwatch/issues/2536
		// firefox: https://github.com/nightwatchjs/nightwatch/issues/2468
		if ( client.options.desiredCapabilities.browserName !== 'internet explorer' ) {
			client
				.click( '.wikit-Button' )
				.pause( 500 )
				.waitForElementPresent( '.wikit-Dialog' )
				.sendKeys( 'body', client.Keys.TAB )
				.elementActive( function ( result ) {
					client.elementIdText( getWebElementIdFromActiveElementResult( result ), ( element ) => {
						elementText = element.value.replace( /\s+/g, ' ' ).trim();
						client.assert.equal( elementText, 'Primary action' );
					} );
				} )
				// sending multiple keys inside array will fail in Firefox.
				// See: https://github.com/nightwatchjs/nightwatch/issues/2468#issuecomment-738089219
				.sendKeys( 'body', client.Keys.TAB + client.Keys.TAB )
				.elementActive( function ( result ) {
					client.elementIdText( getWebElementIdFromActiveElementResult( result ), ( element ) => {
						elementText = element.value.replace( /\s+/g, ' ' ).trim();
						client.assert.equal( elementText, 'Secondary action' );
					} );
				} )
				// makes sure it goes back to the first element after four tabs
				.sendKeys( 'body', client.Keys.TAB + client.Keys.TAB + client.Keys.TAB + client.Keys.TAB )
				.elementActive( function ( result ) {
					client.elementIdText( getWebElementIdFromActiveElementResult( result ), ( element ) => {
						elementText = element.value.replace( /\s+/g, ' ' ).trim();
						client.assert.equal( elementText, 'Primary action' );
					} );
				} );
		}
	} );

	it( 'prevents underlying page from scrolling when opened and on initial render', function ( client ) {
		if ( client.options.desiredCapabilities.browserName !== 'internet explorer' ) {
			client
				.execute( 'document.body.style.height = "150vh";' )
				.execute( 'window.scrollTo( 0, document.body.scrollHeight );' )
				.execute( 'return document.documentElement.scrollHeight > document.documentElement.clientHeight;',
					function ( result ) {
						this.assert.ok( result.value === true, 'body shows scrollbars' );
					} )
				.click( '.wikit-Button' )
				.pause( 250 )
				.saveScreenshot( './screenshot/checkDialog.png' )
				.execute( 'return document.documentElement.scrollHeight > document.documentElement.clientHeight;',
					function ( result ) {
						this.assert.not.ok( result.value === false, 'body does not show scrollbars' );
					} );
		}
	} );

	it( 'resets dialog scroll bars to top when closed and reopened', function ( client ) {
		if ( client.options.desiredCapabilities.browserName !== 'internet explorer' ) {
			client
				.click( '.wikit-Button' )
				.pause( 500 )
				.waitForElementPresent( '.wikit-Dialog' )
				// substract 100px from the dialog's original height so scrollbars are shown
				// TODO: see why this is failing in IE11 in saucelabs
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
		}
	} );
} );
