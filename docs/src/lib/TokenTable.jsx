import React from 'react';
import { flattenTokenTree } from './flattenTokenTree';
import { components } from '@storybook/components/dist/typography/DocumentFormatting';

export function TokenTable( { tokens, valueCell } ) {
	const renderValue = ( value ) => valueCell ? valueCell( value ) : <pre>{value}</pre>;

	return (
		<components.table style={{ width: '100%' }}>
			<thead>
			<tr>
				<th>Name</th>
				<th>Source</th>
				<th>Value</th>
			</tr>
			</thead>
			<tbody>
			{
				flattenTokenTree( tokens ).map( ( { name, referencedTokens, value } ) => (
					<tr key={name} id={name}>
						<td><components.a href={'#' + name}>🔗</components.a> {name}</td>
						<td>{referencedTokens || '-'}</td>
						<td>{renderValue( value )}</td>
					</tr>
				) )
			}
			</tbody>
		</components.table>
	);
}
