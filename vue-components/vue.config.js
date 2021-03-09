module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: '@use "sass:math"; @import "@/styles/main.scss";',
			},
		},
	},
};
