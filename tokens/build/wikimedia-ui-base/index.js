'use strict';

const fs = require( 'fs' ),
	lessToJson = require( 'less-to-json' ),
	{ structureForStyleDictionary } = require( './lib' ),
	WIKIMEDIA_UI_BASE_DIR = `${__dirname}/../../node_modules/wikimedia-ui-base`;

fs.writeFileSync(
	`${WIKIMEDIA_UI_BASE_DIR}/tokens.json`,
	JSON.stringify(
		structureForStyleDictionary(
			lessToJson( `${WIKIMEDIA_UI_BASE_DIR}/wikimedia-ui-base.less` ),
			'wmf-',
		),
		null,
		'\t',
	),
);
