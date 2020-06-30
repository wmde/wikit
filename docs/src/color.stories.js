import traverse from 'traverse';

/**
 * Gets specific set of information about every color in a subset of the color tokens
 *
 * @param {Object} colorType A subtree of the tokens object containing only colors
 *   containing a certain subset of colors, e.g. base, accent, utility etc.
 * @return {{title: string, subtitle: string, hex: string}[]} An array of objects containing
 *   information about a certain color
 */
export function getColorInfo( colorType ) {
	return traverse( colorType ).reduce( ( colors, node ) => {
		if ( !node.original ) {
			return colors;
		}

		return colors.concat( {
			title: node.name,
			subtitle: node.original.value.replace( /{|}|.value/gi, '' ),
			hex: node.value,
		} );
	}, [] );
}
