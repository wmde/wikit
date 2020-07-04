import traverse from 'traverse';
import { TokenTableAll } from './TokenTableAll';
import React from 'react';
import styles from './../styles/dashboard.css';

/**
 * TODO unify with flattenTokenTree
 */
function flatten( nestedTokens ) {
	return traverse( nestedTokens ).reduce( ( tokens, node ) => {
		if ( !node.original ) {
			return tokens;
		}

		return tokens.concat( {
			name: node.name,
			referencedTokens: node.attributes.tokens,
			value: node.value,
		} );
	}, [] );
}

function sortTokensByName( a, b ) {
	return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
}

function globalsEndemic( tokens ) {
	return flatten( tokens )
		.filter( ( token ) => !token.referencedTokens.length )
		.sort( sortTokensByName );
}

function globalsWmfInspired( tokens ) {
	return flatten( tokens )
		.filter( ( token ) => {
			return (
				token.referencedTokens.length === 1
				&&
				token.referencedTokens[0].match( /^wmf-.+/ )
			);
		} )
		.sort( sortTokensByName );
}

function getOtherTokens( tokens, globals ) {
	const aliases = flatten( tokens );
	const globalNames = globals.map( ( token ) => token.name );

	return aliases
		.filter( ( token ) => !globalNames.includes( token.name ) )
		.sort( sortTokensByName );
}

export function Dashboard( { tokens } ) {
	const wmfInspired = globalsWmfInspired( tokens ),
		endemic = globalsEndemic( tokens ),
		globalsCount = endemic.length + wmfInspired.length,
		otherTokens = getOtherTokens( tokens, [ ...wmfInspired, ...endemic ] );

	return (
		<div className="dashboard">
			<h2>Global Tokens ({ globalsCount })</h2>

			<h3>WMF-inspired ({ wmfInspired.length })</h3>
			<div className="scrollit">
				<TokenTableAll tokens={ wmfInspired } />
			</div>

			<h3>Endemic ({ endemic.length })</h3>
			<div className="scrollit">
				<TokenTableAll tokens={ endemic } />
			</div>

			<h2>Aliases ({ otherTokens.length })</h2>
			<div className="scrollit">
				<TokenTableAll tokens={ otherTokens } />
			</div>
		</div>
	)
}
