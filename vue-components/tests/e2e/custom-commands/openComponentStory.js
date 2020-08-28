module.exports.command = function openComponentStory( component ) {
	return this.waitForElementVisible( '#root' )
		.click( `a[href="#${component}"]` )
		.element(
			'id',
			'storybook-preview-iframe',
			( { value } ) => {
				this.frame( value );
			},
		);
};