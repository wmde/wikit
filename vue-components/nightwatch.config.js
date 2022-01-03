const build = `Nightwatch build-${process.env.DATE}`;

/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
	src_folders: [ 'tests/e2e/specs' ],
	page_objects_path: 'tests/e2e/page-objects',
	custom_assertions_path: 'tests/e2e/custom-assertions',
	custom_commands_path: 'tests/e2e/custom-commands',
	globals_path: 'tests/e2e/globals.js',

	webdriver: {
		start_process: ( process.env.NIGHTWATCH_START_DRIVER === 'true' ),
	},

	test_settings: {
		// full default config at
		// https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-e2e-nightwatch/nightwatch.config.js
		default: {
			launch_url: process.env.STORYBOOK_URL,
			isLocal: true,
		},
		docker: {
			launch_url: `http://storybook-vue:${process.env.VUECOMPONENTS_STORYBOOK_PORT}`,
			isLocal: true,
			selenium_host: 'selenium',
			desiredCapabilities: {
				browserName: 'firefox',
				chromeOptions: {
					args: [ 'headless', 'no-sandbox', 'disable-gpu' ],
					w3c: false,
				},
			},
		},
		sauceLabs: {
			launch_url: `${process.env.DEPLOY_URL}/vue-components/`, // DEPLOY_URL is set by a github action
			isLocal: false,
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

		sauceSafari: {
			extends: 'sauceLabs',
			desiredCapabilities: {
				browserName: 'safari',
				platform: 'macOS 10.15',
				version: 'latest',
			},
		},
	},
};
