module.exports.command = function openComponentStory( component ) {
	return this.waitForElementVisible( '#root' )
		.click( `a[href="#${component}"]` )
		.element(
			'css selector',
			'[id="storybook-ref-vue"]',
			( { value } ) => {
				this.frame( value );
			},
		);
};
