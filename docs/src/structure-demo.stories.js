import * as globals from '@wmde/wikit-tokens/properties/global.json';
import * as aliases from '@wmde/wikit-tokens/properties/alias.json';
import traverse from 'traverse';
import _ from 'lodash';

function flattenInputTokenTree( tokens ) {
	return traverse( tokens ).reduce( function ( tokens, node ) {
		return isToken( node ) ? tokens.concat( { ...node, value: this.path.join( '-' ) } ) : tokens;
	}, [] );
}

function markAliases( tokens ) {
	return traverse( tokens ).forEach( function ( node ) {
		if ( isToken( node ) ) {
			this.update( { ...node, alias: true } );
		}
	} );
}

function isToken( token ) {
	return !!token.value;
}

function isAlias( token ) {
	return isToken( token ) && token.alias;
}

function getTokenNestingLevel( subtree ) {
	return traverse( subtree ).reduce( function ( minimumDepth, node ) {
		return node.value ?
			Math.min( this.level, minimumDepth ) :
			minimumDepth;
	}, Infinity );
}

function renderMixedTokenLists( tokens ) {
	const globals = tokens.filter( ( t ) => isToken( t ) && !isAlias( t ) );
	const aliases = tokens.filter( ( t ) => isAlias( t ) );

	return `<div>
			${renderTokenList( globals )}
			${renderTokenList( aliases )}
		</div>`
}

function renderTokenList( tokens ) {
	return '<ul>' +
		tokens.map( ( t ) => `<li>${t.value} (${isAlias( t ) ? 'alias' : 'global'})</li>` ).join( '' ) +
		'</ul>'
}

function renderTokens( tokens ) {
	const flattenedTokens = flattenInputTokenTree( tokens );
	const hasGlobalTokens = flattenedTokens.some( ( t ) => !isAlias( t ) );
	const hasAliases = flattenedTokens.some( isAlias );

	return hasGlobalTokens && hasAliases ? renderMixedTokenLists( flattenedTokens ) : renderTokenList( flattenedTokens );
}

function renderSection( tokens ) {
	let html = '<ul>';

	Object.entries( tokens ).forEach( ( [ section, sectionTokens ] ) => {
		html += `<li>
			<div>${section} (section)</div>
			${renderTokens( sectionTokens )}
		</li>`;
	} );

	return html + '</ul>';
}

function renderSubPage( tokens ) {
	let html = '<ul>';

	Object.entries( tokens ).forEach( ( [ subPage, subPageTokens ] ) => {
		html += `<li>
			<div>${subPage} (sub page)</div>
			${renderSection( subPageTokens )}
		</li>`;
	} );

	return html + '</ul>';
}

function renderWithNestingLevel( depth ) {
	return [
		renderTokens,
		renderSection,
		renderSubPage,
	][ Math.min( 2, depth - 1 ) ];
}

let html = '<ul>';
Object.entries( _.merge( globals.default, markAliases( aliases.default ) ) ).forEach( ( [ page, tokens ] ) => {
	const depth = getTokenNestingLevel( tokens );
	html += `<li>
			<div>${page} (page)</div>
			${renderWithNestingLevel( depth )( tokens )}
		</li>`;
} );
html += '</ul>';

export default {
	title: 'Token Structure',
};

export function tokens() {
	return `<div>${html}</div>`;
}
