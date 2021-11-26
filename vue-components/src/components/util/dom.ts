interface Dimensions<T> {
	width: T;
	height: T;
}

export type ScrollbarDimensions = Dimensions<number>;

export const INTERACTIVE_SELECTORS = [
	'[contenteditable]',
	'[href]',
	'[tabindex]',
	'button',
	'details',
	'iframe',
	'select',
	'summary',
	'textarea',
	'audio[controls]',
	'video[controls]',
	'input[type=radio]:checked',
	'input:not([type=radio]):not([type=hidden])',
];

// Inserts a test element into the document to sample the width and height of
// scrollbars in the particular browser.
export function getScrollbarDimensions(): ScrollbarDimensions {
	const { body } = document;
	const scrollDiv: HTMLElement = document.createElement( 'div' );

	// Append element with defined styling
	scrollDiv.setAttribute(
		'style',
		'width: 666px; height: 666px; position: absolute; left: -9999px; overflow: scroll;',
	);
	body.appendChild( scrollDiv );

	// Collect width & height of scrollbar
	const calculateValue = ( type: 'Width'|'Height' ): number => {
		const offsetKey: 'offsetWidth'|'offsetHeight' = ( type === 'Width' ? 'offsetWidth' : 'offsetHeight' );
		const clientKey: 'clientWidth'|'clientHeight' = ( type === 'Width' ? 'clientWidth' : 'clientHeight' );

		return scrollDiv[ offsetKey ] - scrollDiv[ clientKey ];
	};
	const scrollbarWidth = calculateValue( 'Width' );
	const scrollbarHeight = calculateValue( 'Height' );

	// Remove element
	body.removeChild( scrollDiv );

	return {
		width: scrollbarWidth,
		height: scrollbarHeight,
	};
}

// Retrieves all interactive descendants of a DOM Node
export function getInteractiveDescendants( parent: Element ): Element[] {
	return Array.from( parent.querySelectorAll( INTERACTIVE_SELECTORS.join( ', ' ) ) )
		.filter( ( element: Element ) => {
			const tabindex = parseInt( element.getAttribute( 'tabindex' ) ?? '0' );

			return !element.hasAttribute( 'disabled' )
				&& !element.hasAttribute( 'hidden' )
				&& tabindex > -1;
		} );
}
