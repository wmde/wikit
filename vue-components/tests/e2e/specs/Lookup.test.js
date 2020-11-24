module.exports = {
	'Lookup Menu shows on user input': ( client ) => {
		client
			.init()
			.openComponentStoryDirectory( 'lookup' )
			.openComponentStory( 'lookup-lookup' )
			.waitForElementPresent( '.wikit-Lookup' )
			.setValue( 'input', 'potato' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.visible( '.wikit-Lookup__menu' );
	},
	'Lookup Menu displays no-results text on no matches found': ( client ) => {
		client
			.pause( 500 )
			.init()
			.openComponentStoryDirectory( 'lookup' )
			.openComponentStory( 'lookup-lookup' )
			.waitForElementPresent( '.wikit-Lookup' )
			.setValue( 'input', 'whatever' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.containsText( '.wikit-OptionsMenu__no-results', 'No match was found' );
	},
	'Lookup Menu selects menu item when OptionsMenu-Item clicked': ( client ) => {
		client
			.pause( 500 )
			.init()
			.openComponentStoryDirectory( 'lookup' )
			.openComponentStory( 'lookup-lookup' )
			.waitForElementPresent( '.wikit-Lookup' )
			.setValue( 'input', 'potato' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.visible( '.wikit-OptionsMenu__item' )
			.click( '.wikit-OptionsMenu__item' )
			.assert.containsText( '.selected-item-label', 'potato' )
			.assert.containsText( '.selected-item-id', 'Q10998' );
	},
	'Lookup emits first and last index on scroll change': ( client ) => {
		client
			.pause( 500 )
			.init()
			.openComponentStoryDirectory( 'lookup' )
			.openComponentStory( 'lookup-lookup' )
			.waitForElementPresent( '.wikit-Lookup' )
			.setValue( 'input', 'a' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.execute( 'document.querySelectorAll(".wikit-OptionsMenu__item")[7].scrollIntoView(false)' )
			.assert.containsText( '.first-visible-element-index', '2' )
			.assert.containsText( '.last-visible-element-index', '7' );
	},
};
