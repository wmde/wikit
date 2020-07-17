import React from 'react';
import { TokenPresenter } from './TokenPresenter';
import { components } from '@storybook/components/dist/typography/DocumentFormatting';
import { AnchorMdx } from '@storybook/addon-docs/dist/blocks/mdx';
import './../styles/token-table.css';

export function TokenTable( { tokens } ) {
	return (
		<components.table className='token-table' style={{ width: '100%' }}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Value / Swatch</th>
				</tr>
			</thead>
			<tbody>
				{
					tokens.map( ( token ) => (
						<tr key={ token.name } id={ token.name }>
							<td>
								<AnchorMdx href={ '#' + token.name }>🔗</AnchorMdx>
							&nbsp;<strong className="token-name">{ token.name }</strong>
								<div className="referenced-tokens" title="value influenced by">
									{token.referencedTokens.length > 0 ?
										token.referencedTokens.map( ( token, i ) => [
											i > 0 ? ', ' : '',
											<span key={i} className="token-name">{token}</span>,
										] ) :
										'-'
									}
								</div>
							</td>
							<td>
								<pre>{ token.value }</pre>
								<TokenPresenter token={ token } />
							</td>
						</tr>
					) )
				}
			</tbody>
		</components.table>
	);
}
