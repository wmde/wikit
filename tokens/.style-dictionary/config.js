'use strict';

const StyleDictionary = require( 'style-dictionary' ),
	tokenSchema = require( './token-schema.json' ),
	{ removeWikimediaUiBaseVars, getReferencedTokens, kebabCase } = require( './lib' ),
	wikitStyleDictionary = StyleDictionary.extend( {
		include: [ 'node_modules/wikimedia-ui-base/tokens.json' ],
		source: [ 'properties/**/*.json' ],
		platforms: {
			scss: {
				transforms: [
					...StyleDictionary.transformGroup.scss,
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: '_variables.scss',
					format: 'scss/variables',
					filter: removeWikimediaUiBaseVars,
					options: {
						outputReferences: false,
					},
				} ],
			},
			css: {
				transforms: [
					...StyleDictionary.transformGroup.css,
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: 'variables.css',
					format: 'css/variables',
					filter: removeWikimediaUiBaseVars,
				} ],
			},
			less: {
				transforms: [
					...StyleDictionary.transformGroup.less,
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: '_variables.less',
					format: 'less/variables',
					filter: removeWikimediaUiBaseVars,
				} ],
			},
			json: {
				transforms: [
					...StyleDictionary.transformGroup.web,
					'name/kebabCase',
					'attr/tokenList',
				],
				buildPath: 'dist/',
				files: [ {
					destination: 'index.json',
					format: 'json',
					filter: removeWikimediaUiBaseVars,
				} ],
			},
			jsonSchema: {
				transforms: StyleDictionary.transformGroup.web,
				buildPath: 'dist/',
				files: [ {
					destination: 'schema.json',
					format: 'jsonSchema',
				} ],
			},
		},
	} );

wikitStyleDictionary.registerTransform( {
	name: 'attr/tokenList',
	type: 'attribute',
	transformer: getReferencedTokens,
} );

wikitStyleDictionary.registerTransform( {
	name: 'name/kebabCase',
	type: 'name',
	transformer: kebabCase,
} );

wikitStyleDictionary.registerFormat( {
	name: 'jsonSchema',
	formatter( dictionary ) {
		tokenSchema.definitions.tokenReference = {
			type: 'string',
			enum: dictionary.allProperties.map(
				( token ) => `{${token.path.join( '.' )}.value}`,
			),
		};

		return JSON.stringify( tokenSchema );
	},
} );

wikitStyleDictionary.buildAllPlatforms();
