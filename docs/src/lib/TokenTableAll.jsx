import React from 'react';
import { flattenTokenTree } from './flattenTokenTree';
import { components } from '@storybook/components/dist/typography/DocumentFormatting';
import { AnchorMdx } from '@storybook/addon-docs/dist/blocks/mdx';
import { ColorItem } from '@storybook/addon-docs/blocks';
import Shadows from './presenters/Shadows';
import LineHeight from './presenters/LineHeight';
import FontWeight from './presenters/FontWeight';
import FontSize from './presenters/FontSize';
import FontFamily from './presenters/FontFamily';
import Transition from './presenters/Transition';
import Cursor from './presenters/Cursor';

function render( token ) {
	const value = token.value;
	if ( token.name.match(/\bcolor\b/) ) {
		return <ColorItem key={ token.name }
			title={ token.name }
			subtitle={ token.referencedTokens }
			colors={[ token.value ]}
		/>;
	}
	else if ( token.name.match( /\bfont-family\b/ ) ) {
		return <FontFamily token={ token } />;
	}
	else if ( token.name.match( /\bfont-size\b/ ) ) {
		return <FontSize token={ token } />;
	}
	else if ( token.name.match( /\bfont-weight\b/ ) ) {
		return <FontWeight token={ token } />;
	}
	else if ( token.name.match( /\bline-height\b/ ) ) {
		return <LineHeight token={ token } />
	}
	else if ( token.name.match( /\bbox-shadow\b/ ) ) {
		return <Shadows token={ token } />
	}
	else if ( token.name.match( /\btransition\b/ ) ) {
		return <Transition token={ token } />
	}
	else if ( token.name.match( /\bcursor\b/ ) ) {
		return <Cursor token={ token } />
	}
	return <pre>{value}</pre>;
}

export function TokenTableAll( { tokens } ) {
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
						<td>{ render( token ) }</td>
					</tr>
				) )
			}
			</tbody>
		</components.table>
	);
}
