module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: '@at-root { @import "./src/styles/_reset"; }',
			},
		},
	},
};
