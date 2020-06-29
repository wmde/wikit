'use strict';

const { removeWikimediaUiBaseVars } = require( './lib' ),
	StyleDictionary = require( 'style-dictionary' ).extend( {
		include: [ 'node_modules/wikimedia-ui-base/tokens.json' ],
		source: [ 'properties/**/*.json' ],
		platforms: {
			scss: {
				transformGroup: 'scss',
				buildPath: 'dist/',
				files: [ {
					destination: '_variables.scss',
					format: 'scss/variables',
					filter: removeWikimediaUiBaseVars,
				} ],
			},
			css: {
				transformGroup: 'css',
				buildPath: 'dist/',
				files: [ {
					destination: 'variables.css',
					format: 'css/variables',
					filter: removeWikimediaUiBaseVars,
				} ],
			},
			less: {
				transformGroup: 'less',
				buildPath: 'dist/',
				files: [ {
					destination: '_variables.less',
					format: 'less/variables',
					filter: removeWikimediaUiBaseVars,
				} ],
			},
			json: {
				transformGroup: 'web',
				buildPath: 'dist/',
				files: [ {
					destination: 'index.json',
					format: 'json',
					filter: removeWikimediaUiBaseVars,
				} ],
			},
		},
	} );

StyleDictionary.buildAllPlatforms();
