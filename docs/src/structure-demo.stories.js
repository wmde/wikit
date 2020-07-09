import * as globals from '@wmde/wikit-tokens/properties/global.json';
import * as aliases from '@wmde/wikit-tokens/properties/alias.json';
import traverse from 'traverse';
import _ from 'lodash';

function flattenInputTokenTree( tokens ) {
	return traverse( tokens ).reduce( function ( tokens, node ) {
		return node.value ? tokens.concat( this.path.join( '-' ) ) : tokens;
	}, [] );
}

function getTokenNestingLevel( subtree ) {
	return traverse( subtree ).reduce( function ( minimumDepth, node ) {
		return node.value ?
			Math.min( this.level, minimumDepth ) :
			minimumDepth;
	}, Infinity );
}

function renderTokens( tokens ) {
	return '<ul>' +
		flattenInputTokenTree( tokens ).map( ( t ) => `<li>${t}</li>` ).join( '' ) +
		'</ul>';
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
Object.entries( _.merge( globals.default, aliases.default ) ).forEach( ( [ page, tokens ] ) => {
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
