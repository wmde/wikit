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
			.init()
			.openComponentStoryDirectory( 'lookup' )
			.openComponentStory( 'lookup-lookup' )
			.waitForElementPresent( '.wikit-Lookup' )
			.setValue( 'input', 'whatever' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.containsText( '.wikit-LookupMenu__no-results', 'No match was found' );
	},
	'Lookup Menu selects menu item when LookupMenu-Item clicked': ( client ) => {
		client
			.init()
			.openComponentStoryDirectory( 'lookup' )
			.openComponentStory( 'lookup-lookup' )
			.waitForElementPresent( '.wikit-Lookup' )
			.setValue( 'input', 'potato' )
			.waitForElementPresent( '.wikit-Lookup__menu' )
			.assert.visible( '.wikit-LookupMenu__item' )
			.click( '.wikit-LookupMenu__item' )
			.assert.containsText( '.selected-item-label', 'potato' )
			.assert.containsText( '.selected-item-id', 'Q10998' );
	},
};
