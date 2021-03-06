import traverse from 'traverse';

/**
 * Gets the name, referenced tokens (if any), and resolved value of all tokens
 * contained in a nested tokens object.
 *
 * @param {Object} nestedTokens A potentially nested object containing tokens
 * @return {{name: string, referencedTokens: string, value: string}[]} Array of
 *     objects containing token information.
 */
export function flattenTokenTree( nestedTokens ) {
	return traverse( nestedTokens ).reduce( ( tokens, node ) => {
		if ( !node.original ) {
			return tokens;
		}

		return tokens.concat( {
			path: node.path,
			name: node.name,
			referencedTokens: node.attributes.tokens,
			value: node.value,
		} );
	}, [] );
}
