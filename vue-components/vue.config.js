module.exports = {
	configureWebpack: () => ( {
		externals: process.env.VUE_APP_VUE3COMPAT ? [ 'vue', '@vue/composition-api' ] : [ 'vue' ],
	} ),
	css: {
		loaderOptions: {
			sass: {
				additionalData: '@use "sass:math"; @import "@/styles/main.scss";',
			},
		},
	},
};
