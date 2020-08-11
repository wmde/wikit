/* eslint-disable @typescript-eslint/indent, indent */
module.exports = {
	'default e2e tests': ( client ) => {
		client
			.init()
			.waitForElementVisible( '#root' ) // Storybook's root node
			.click( 'a[href="#button"]' ); // load the vue components frame

		client.element(
			'css selector',
			'[id="storybook-ref-vue"]',
			( result ) => {
				const frameWebElementId = result.value;
				client.frame( frameWebElementId );
				client.waitForElementVisible( '.wikit-Button' );
				client.assert.elementPresent( '.wikit-Button' );
				client.end();
			},
		);
	},
};
