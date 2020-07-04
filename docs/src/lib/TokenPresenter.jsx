import React from 'react';
import Shadows from './presenters/Shadows';
import LineHeight from './presenters/LineHeight';
import FontWeight from './presenters/FontWeight';
import FontSize from './presenters/FontSize';
import FontFamily from './presenters/FontFamily';
import Transition from './presenters/Transition';
import Cursor from './presenters/Cursor';
import Default from './presenters/Default';
import { ColorItem } from '@storybook/addon-docs/blocks';

/**
 * Is a token used to denote another (CSS) property,
 * e.g. "transition-property-box-shadow" = "box-shadow"
 *
 * @param name
 * @return {boolean}
 */
function isPropertyToken( name ) {
	return !!name.match(/\bproperty\b/);
}

export function TokenPresenter( { token } ) {
	const name = token.name;

	if ( isPropertyToken( name ) ) {
		return <Default token={ token } />;
	}

	if ( name.match(/\bcolor\b/) ) {
		return <ColorItem key={ name }
			title={ name }
			subtitle={ token.referencedTokens }
			colors={[ token.value ]}
		/>;
	}
	else if ( name.match( /\bfont-family\b/ ) ) {
		return <FontFamily token={ token } />;
	}
	else if ( name.match( /\bfont-size\b/ ) ) {
		return <FontSize token={ token } />;
	}
	else if ( name.match( /\bfont-weight\b/ ) ) {
		return <FontWeight token={ token } />;
	}
	else if ( name.match( /\bline-height\b/ ) ) {
		return <LineHeight token={ token } />
	}
	else if ( name.match( /\bbox-shadow\b/ ) ) {
		return <Shadows token={ token } />
	}
	else if ( name.match( /\btransition\b/ ) ) {
		return <Transition token={ token } />
	}
	else if ( name.match( /\bcursor\b/ ) ) {
		return <Cursor token={ token } />
	}

	return <Default token={ token } />;
}
