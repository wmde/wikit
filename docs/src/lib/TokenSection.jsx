import React from 'react';
import { components } from '@storybook/components/dist/typography/DocumentFormatting';
import { flattenTokenTree } from './flattenTokenTree';
import { TokenTable } from './TokenTable';
import './../styles/token-table.css';
import * as aliases from '@wmde/wikit-tokens/properties/alias.json';
import * as globals from '@wmde/wikit-tokens/properties/global.json';
import traverse from 'traverse';

function isAlias( token ) {
	return traverse( aliases.default ).has( token.path );
}
function isGlobal( token ) {
	return traverse( globals.default ).has( token.path );
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
