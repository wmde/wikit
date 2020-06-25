
function structureForStyleDictionary( tokens, prefix ) {
	const returnTokens = {};
	Object.keys( tokens ).forEach( ( key ) => {
		returnTokens[ prefix + key ] = tokenTemplate( key, tokens[ key ] );
	} );
	return returnTokens;
}

function tokenTemplate( originalName, value ) {
	return {
		value,
		comment: `WMF import: @${originalName}`,
	};
}

module.exports = {
	structureForStyleDictionary,
};
