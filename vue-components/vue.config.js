module.exports = {
	configureWebpack: () => ( {
		externals: process.env.VUE_APP_VUE3COMPAT ? [ 'vue', '@vue/composition-api' ] : [ 'vue' ],
	} ),
	css: {
		loaderOptions: {
			sass: {
				additionalData: '@use "sass:math"; @use "@/styles/shared" as *; @import "@/styles/main.scss";',
			},
		},
	},
};
