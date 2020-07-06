import React from 'react';
import { flattenTokenTree } from './flattenTokenTree';
import Default from './presenters/Default';
import { components } from '@storybook/components/dist/typography/DocumentFormatting';
import { AnchorMdx } from '@storybook/addon-docs/dist/blocks/mdx';

export function TokenTable( { tokens, Presenter } ) {
	Presenter = Presenter || Default;

	return (
		<components.table style={{ width: '100%' }}>
			<thead>
			<tr>
				<th>Name</th>
				<th>Value / Swatch</th>
			</tr>
			</thead>
			<tbody>
			{
				flattenTokenTree( tokens ).map( ( token ) => (
					<tr key={ token.name } id={ token.name }>
						<td>
							<AnchorMdx href={ '#' + token.name }>🔗</AnchorMdx>
							&nbsp;<strong>{ token.name }</strong>
							<br />
							{ token.referencedTokens ?
								<span title="value influenced by">{ token.referencedTokens }</span> :
								<i>primary value</i>
							}
						</td>
						<td>
							<Presenter token={ token } />
						</td>
					</tr>
				) )
			}
			</tbody>
		</components.table>
	);
}
