const postcss = require( 'postcss' );
const selectorParser = require( 'postcss-selector-parser' );

// copied & modified from https://github.com/pazams/postcss-scopify/blob/master/index.js#L86
function isRuleScopable( rule ) {
	if ( rule.parent.type !== 'root' ) {
		return rule.parent.type === 'atrule' && [ 'media', 'supports', 'document' ].includes( rule.parent.name );
	} else {
		return true;
	}
}

const addWikitClassToFirstSelectorNode = selectorParser( ( selectors ) => {
	const selector = selectors.first; // there is always only one selector passed at a time from where it's called
	const wikitClassNode = selectorParser.className( { value: 'wikit' } );
	if ( [ 'pseudo', 'attribute' ].includes( selector.first.type ) ) {
		selector.insertBefore( selector.first, wikitClassNode );
	} else {
		selector.insertAfter( selector.first, wikitClassNode );
	}
} );

function applyWikitScope( selector ) {
	return `.wikit ${selector}, ${addWikitClassToFirstSelectorNode.processSync( selector )}`;
}

module.exports = postcss.plugin( 'wikit-scope', () => ( ( root ) => {
	root.walkRules( ( rule ) => {
		if ( !isRuleScopable( rule ) ) {
			return;
		}

		rule.selectors = rule.selectors.map( applyWikitScope );
	} );
} ) );
