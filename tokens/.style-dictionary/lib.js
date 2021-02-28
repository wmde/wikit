'use strict';

require( 'string.prototype.matchall/auto' );
const { inheritedVariablePrefix } = require( '../build/wikimedia-ui-base/config' );

function removeWikimediaUiBaseVars( prop ) {
	return !prop.name.startsWith( inheritedVariablePrefix );
}

function getReferencedTokens( prop ) {
	const variablePattern = /{\s*(?<token>.+?)\.value\s*}/g;

	return {
		tokens: [ ...prop.original.value.matchAll( variablePattern ) ]
			.map( ( match ) => match.groups.token.replace( /\./g, '-' ) ),
	};
}

function kebabCase( { path } ) {
	return path.join( '-' );
}

module.exports = {
	removeWikimediaUiBaseVars,
	getReferencedTokens,
	kebabCase,
};
