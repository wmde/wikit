exports.command = function () {
	if ( !this.options.isLocal ) {
		const SauceLabs = require( 'saucelabs' ).default;
		const account = new SauceLabs( {
			user: process.env.SAUCE_USERNAME,
			key: process.env.SAUCE_ACCESS_KEY,
		} );

		const sessionId = this.sessionId;
		const testPassed = this.currentTest.results.failed === 0;

		account.updateJob(
			process.env.SAUCE_USERNAME,
			sessionId,
			{
				tags: [ 'WiKit' ],
				passed: testPassed,
			},
		);
	}
};
