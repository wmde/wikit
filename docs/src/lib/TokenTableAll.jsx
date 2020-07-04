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
import Default from './presenters/Default';

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

function render( token ) {
	const name = token.name;

	if ( isPropertyToken( name ) ) {
		return <Default token={ token } />;
	}

	if ( name.match(/\bcolor\b/) ) {
		return <ColorItem key={ name }
			title={ name }
			subtitle={ token.referencedTokens }
			colors={[ token.value ]}
		/>;
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

export function TokenTableAll( { tokens } ) {
	const flatTokens = Array.isArray( tokens ) ? tokens : flattenTokenTree( tokens );
	return (
		<components.table className="dashboardTable" style={{ width: '100%' }}>
			<thead>
			<tr>
				<th>Name</th>
				<th>Value / Swatch</th>
			</tr>
			</thead>
			<tbody>
			{
				flatTokens.map( ( token ) => (
					<tr key={ token.name } id={ token.name }>
						<td>
							<AnchorMdx href={ '#' + token.name }>🔗</AnchorMdx>
							&nbsp;<strong>{ token.name }</strong>
							<br />
							{ token.referencedTokens.length ?
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
