import React from 'react';
import Shadows from './Shadows';
import LineHeight from './LineHeight';
import FontWeight from './FontWeight';
import FontSize from './FontSize';
import FontFamily from './FontFamily';
import Transition from './Transition';
import Cursor from './Cursor';
import Default from './Default';
import Color from './Color';

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

export function InferPresenter( { token } ) {
	const name = token.name;

	if ( isPropertyToken( name ) ) {
		return <Default token={ token } />;
	}

	if ( name.match(/\bcolor\b/) ) {
		return <Color token={ token } />;
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
