module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	setupFilesAfterEnv: [ '<rootDir>/tests/config/setup.ts' ],
	testEnvironment: '<rootDir>/tests/config/JestCustomEnvironment.js',
};
