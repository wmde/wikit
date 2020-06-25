const fs = require( 'fs' );
const WIKIMEDIA_UI_BASE_DIR = `${__dirname}/../../node_modules/wikimedia-ui-base`;
const lessToJson = require( 'less-to-json' );
const lib = require( './lib' );

fs.writeFileSync(
	`${WIKIMEDIA_UI_BASE_DIR}/tokens.json`,
	JSON.stringify(
		lib.structureForStyleDictionary(
			lessToJson( `${WIKIMEDIA_UI_BASE_DIR}/wikimedia-ui-base.less` ),
			'wmf-'
		),
		null,
		'\t'
	),
);
