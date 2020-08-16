const SauceLabs = require( 'saucelabs' ).default;
const account = new SauceLabs( { user: process.env.SAUCE_USERNAME, key: process.env.SAUCE_ACCESS_KEY } );

module.exports = {
	// this controls whether to abort the test execution when an assertion failed and skip the rest
	// it's being used in waitFor commands and expect assertions
	abortOnAssertionFailure: false,

	// this will overwrite the default polling interval (currently 500ms) for waitFor commands
	// and expect assertions that use retry
	waitForConditionPollInterval: 500,

	// default timeout value in milliseconds for waitFor commands and implicit waitFor value for
	// expect assertions
	waitForConditionTimeout: 20000,

	// Pass information about the browser tests to SauceLabs
	afterEach( client, done ) {
		if ( !this.isLocal ) {
			const sessionId = client.sessionId;
			const testPassed = client.currentTest.results.failed === 0;
			client.end( function () {
				account.updateJob(
					process.env.SAUCE_USERNAME,
					sessionId,
					{
						tags: [ 'WiKit' ],
						passed: testPassed,
					},
				);
				done();
			} );
		}
	},
};
