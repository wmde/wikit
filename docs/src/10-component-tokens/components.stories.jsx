import tokens from '@wmde/wikit-tokens/dist/index.json';
import { flattenTokenTree } from '../lib/flattenTokenTree';
import { storiesOf } from '@storybook/react'; // TODO
import React from 'react';
import { TokenTable } from '../lib/TokenTable';

const groupedTokens = {};
flattenTokenTree( tokens )
	.filter( ( token ) => {
		return token.path[0].indexOf( 'wikit-' ) !== -1;
	} )
	.forEach( ( token ) => {
		const component = token.name.split( '-' )[1]; // component name is the second part after 'wikit-'
		groupedTokens[ component ] = groupedTokens[ component ] || [];
		groupedTokens[ component ].push( token );
	} );

for ( let key in groupedTokens ) {
	storiesOf( 'Component tokens', module )
		.add( key, () => <TokenTable tokens={ groupedTokens[ key ] } /> );
}
