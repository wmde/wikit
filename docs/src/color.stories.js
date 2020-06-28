import { color } from '../../tokens/dist/index.json';

/**
 * Gets specific set of information about every color in a subset of the color tokens
 * @param {json} colorType an object containing a certain subset of colors, e.g. base, accent, utility etc.
 * @returns {Array} An array of objects containing information (title, subtitle, hex) about a certain color
 */
const getColorInfo = ( colorType ) => {
    return Object.keys( colorType ).map( color => {
        return {
            title: colorType[ color ].name,
            subtitle: colorType[ color ].original.value.replace( /{|}|.value/gi, '' ),
            hex: colorType[ color ].value
        };
    } );
}

export const colorBase = () => {
    return getColorInfo( color.base );
}

export const colorAccent = () => {
    return getColorInfo( color.accent );
}

export const colorUtility = () => {
    let allUtilityColors = [];
    for ( const utilityColor in color.utility ) {
        allUtilityColors = allUtilityColors.concat( getColorInfo( color.utility[ utilityColor ] ) );
    }
    return allUtilityColors;
}

export const colorModifier = () => {
    let allModifierColors = [];
    for ( const modifierColor in color.modifier ) {
        allModifierColors = allModifierColors.concat( getColorInfo( color.modifier[ modifierColor ] ) );
    }
    return allModifierColors;
}