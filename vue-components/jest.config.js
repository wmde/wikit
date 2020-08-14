module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	setupFilesAfterEnv: [ '<rootDir>/tests/config/setup.ts' ],
	testEnvironment: '<rootDir>/tests/config/JestCustomEnvironment.js',
};

module.exports.collectCoverageFrom = [
	'src/**/*.{ts,vue}',
	'build/**/*.js',
];
module.exports.coverageReporters = [ 'lcov', 'text' ];
