'use strict';

const fs = require( 'fs' ),
	lessToJson = require( 'less-to-json' ),
	{ structureForStyleDictionary } = require( './lib' ),
	{ inheritedVariablePrefix } = require( './config' ),
	WIKIMEDIA_UI_BASE_DIR = `${__dirname}/../../node_modules/wikimedia-ui-base`;

fs.writeFileSync(
	`${WIKIMEDIA_UI_BASE_DIR}/tokens.json`,
	JSON.stringify(
		structureForStyleDictionary(
			lessToJson( `${WIKIMEDIA_UI_BASE_DIR}/wikimedia-ui-base.less` ),
			inheritedVariablePrefix,
		),
		null,
		'\t',
	),
);
