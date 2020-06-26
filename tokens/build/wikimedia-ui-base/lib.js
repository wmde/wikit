'use strict';

function tokenTemplate( originalName, value ) {
	return {
		value,
		comment: `WMF import: @${originalName}`,
	};
}

/**
 * Structure a map of tokens for consumption by style-dictionary
 *
 * See https://github.com/amzn/style-dictionary/#style-properties
 *
 * @param {Object.<string, *>} tokens A map of tokens
 * @param {string}             prefix A prefix to apply to all resulting tokens
 * @return {Object.<string, {value: *, comment: string}>}
 */
function structureForStyleDictionary( tokens, prefix ) {
	const returnTokens = {};
	Object.keys( tokens ).forEach( ( key ) => {
		returnTokens[ prefix + key ] = tokenTemplate( key, tokens[ key ] );
	} );
	return returnTokens;
}

module.exports = {
	structureForStyleDictionary,
};
