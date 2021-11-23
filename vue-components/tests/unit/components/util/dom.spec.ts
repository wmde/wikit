import { getInteractiveDescendants } from '@/components/util/dom';

describe( 'dom.getInteractiveDescendants()', () => {

	const HTML = `
	<button class="see-me">See Me</button>
	<input class="see-me" />
	<button class="dont-see-me" disabled>Don't See Me</button>
	<button class="dont-see-me" hidden>Don't See Me</button>
	<input class="dont-see-me" type="hidden" />
	<div class="see-me" tabindex="0">See Me</div>
	<button class="dont-see-me" tabindex="-1">Don't See Me</button>
	`;

	let container: Element | null = null;

	beforeEach( () => {
		container = document.createElement( 'div' );
		container.classList.add( 'parent' );
		container.innerHTML = HTML;
		document.body.appendChild( container );
	} );

	it( 'gets an array with interactive descendants', () => {
		const expected = Array.from( document.querySelectorAll( '.see-me' ) );
		const result = getInteractiveDescendants( container! );

		expect( result ).toEqual( expected );
	} );

	test.each( [
		{ type: 'hidden', selector: '[hidden], [type=hidden]' },
		{ type: 'disabled', selector: '[disabled]' },
		{ type: 'non tabbing', selector: '[tabindex^="-"]' },
	] )( 'skips $type elements', ( { selector } ) => {
		const ignored = Array.from( document.querySelectorAll( selector ) );
		const result = getInteractiveDescendants( container! );

		ignored.forEach( ( element ) => {
			expect( result ).not.toContain( element );
		} );
	} );
} );
