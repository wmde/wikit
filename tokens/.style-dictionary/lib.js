'use strict';

const { inheritedVariablePrefix } = require( '../build/wikimedia-ui-base/config' );

function removeWikimediaUiBaseVars( prop ) {
	return !prop.name.startsWith( inheritedVariablePrefix );
}

function getReferencedTokens( prop ) {
	const variablePattern = /{\s*(?<token>.+?)\.value\s*}/g,
		matchedVariables = [];

	let match;
	// eslint-disable-next-line no-cond-assign
	while ( match = variablePattern.exec( prop.original.value ) ) { // node >=12: use matchAll
		matchedVariables.push( match.groups.token );
	}
	return {
		tokens: matchedVariables,
	};
}

module.exports = {
	removeWikimediaUiBaseVars,
	getReferencedTokens,
};
