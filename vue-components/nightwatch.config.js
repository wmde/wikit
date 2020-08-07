const build = `Nightwatch build-${process.env.DATE}`;

/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
	src_folders: [ 'tests/e2e/specs' ],
	page_objects_path: 'tests/e2e/page-objects',
	custom_commands_path: 'tests/e2e/custom-commands',

	test_workers: {
		enabled: true,
		workers: 'auto',
	},

	test_settings: {
		// full default config at
		// https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-e2e-nightwatch/nightwatch.config.js
		default: {
			launch_url: 'localhost:6005',
		},
		sauceLabs: {
			launch_url: 'https://wmde.github.io/wikit/vue-components/',
			selenium_host: 'ondemand.saucelabs.com',
			selenium_port: 80,
			username: process.env.SAUCE_USERNAME,
			access_key: process.env.SAUCE_ACCESS_KEY,
			desiredCapabilities: {
				build,
				screenResolution: '1600x1200',
				seleniumVersion: '3.141.59',
			},
		},
		sauceChrome: {
			extends: 'sauceLabs',
			desiredCapabilities: {
				browserName: 'googlechrome',
				platform: 'Windows 10',
				version: 'latest',
			},
		},

		sauceFirefox: {
			extends: 'sauceLabs',
			desiredCapabilities: {
				browserName: 'firefox',
				platform: 'Windows 10',
				version: 'latest',
			},
		},

		sauceIE: {
			extends: 'sauceLabs',
			desiredCapabilities: {
				browserName: 'internet explorer',
				platform: 'Windows 10',
				version: 'latest',
			},
		},

		sauceEdge: {
			extends: 'sauceLabs',
			desiredCapabilities: {
				browserName: 'MicrosoftEdge',
				platform: 'Windows 10',
				version: 'latest',
			},
		},
	},
};
