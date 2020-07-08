/* eslint-disable */
import * as globals from '@wmde/wikit-tokens/properties/global.json';
import * as compiledTokens from '@wmde/wikit-tokens/dist/index.json';
import { storiesOf } from '@storybook/vue';
import { flattenTokenTree } from './lib/flattenTokenTree';

// TODO how to avoid storiesOf but have dynamic exports?

function renderSubPage( compiledTokens ) {
	// TODO how to TokenTable
	const list = flattenTokenTree( compiledTokens );
	return `<pre>${JSON.stringify( list, null, '\t' )}</pre>`;
}

for ( const page in globals.default ) {
	const story = storiesOf( 'Design Tokens|' + page, module );

	for ( const subpage in globals.default[ page ] ) {
		story.add( subpage, () =>
			`<div>
				<h2>${subpage}</h2>
				${renderSubPage( compiledTokens.default[ page ][ subpage ] )}
			</div>`
		);
	}
}
