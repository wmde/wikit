module.exports.command = function openComponentStory( component ) {
	return this.waitForElementVisible( '#root' )
		.click( `a[href="#${component}"]` )
		.element(
			'id',
			'storybook-ref-vue',
			( { value } ) => {
				if ( value && !value.error ) {
					this.frame( value ); // storybook composition
				} else {
					this.frame( 'storybook-preview-iframe' ); // vue-components storybook, no composition
				}
			},
		);
};
