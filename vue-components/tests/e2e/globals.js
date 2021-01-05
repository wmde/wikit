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

	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
};
