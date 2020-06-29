'use strict';

const { inheritedVariablePrefix } = require( '../build/wikimedia-ui-base/config' );

function removeWikimediaUiBaseVars( prop ) {
	return !prop.name.startsWith( inheritedVariablePrefix );
}

module.exports = {
	removeWikimediaUiBaseVars,
};
