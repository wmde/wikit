import React from 'react';
import { components } from '@storybook/components';
import { flattenTokenTree } from './flattenTokenTree';
import { TokenTable } from './TokenTable';
import './../styles/token-table.css';
import * as aliasTokens from '@wmde/wikit-tokens/properties/alias.json';
import * as globalTokens from '@wmde/wikit-tokens/properties/global.json';
import traverse from 'traverse';

function isAlias( token ) {
	return traverse( aliasTokens.default ).has( token.path );
}
function isGlobal( token ) {
	return traverse( globalTokens.default ).has( token.path );
}

export function TokenSection( { tokens } ) {
	// split into two tables if necessary
	const allTokensFlattened = flattenTokenTree( tokens );
	const hasAliases = allTokensFlattened.some( isAlias );
	const hasGlobals = allTokensFlattened.some( isGlobal );

	if ( hasAliases && hasGlobals ) {
		const aliases = allTokensFlattened.filter( isAlias );
		const globals = allTokensFlattened.filter( isGlobal );

		return (
			<div>
				<components.h4>Globals</components.h4>
				<TokenTable tokens={globals} />
				<components.h4>Aliases</components.h4>
				<TokenTable tokens={aliases} />
			</div>
		);
	}

	return (
		<TokenTable tokens={allTokensFlattened} />
	);
}
