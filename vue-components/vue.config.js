module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: '@at-root { @import "~ress"; }',
			},
		},
	},
};
