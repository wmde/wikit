import { color } from '@wmde/wikit-tokens';

/**
 * Gets specific set of information about every color in a subset of the color tokens
 *
 * @param {Object.<string, {name: string, value: string, original: any}>} colorType An object
 *   containing a certain subset of colors, e.g. base, accent, utility etc.
 * @return {{title: string, subtitle: string, hex: string}[]} An array of objects containing
 *   information about a certain color
 */
function getColorInfo( colorType ) {
	return Object.keys( colorType ).map( ( color ) => ( {
		title: colorType[ color ].name,
		subtitle: colorType[ color ].original.value.replace( /{|}|.value/gi, '' ),
		hex: colorType[ color ].value,
	} ) );
}

function flattenColorInfo( values ) {
	let tokens = [];
	for ( const topic in values ) {
		tokens = tokens.concat( getColorInfo( values[ topic ] ) );
	}
	return tokens;
}

export function colorBase() {
	return getColorInfo( color.base );
}

export function colorAccent() {
	return getColorInfo( color.accent );
}

export function colorUtility() {
	return flattenColorInfo( color.utility );
}

export function colorModifier() {
	return flattenColorInfo( color.modifier );
}
