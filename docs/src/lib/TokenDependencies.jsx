import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as tokenTree from '@wmde/wikit-tokens/dist/all.json';
import { flattenTokenTree } from './flattenTokenTree';
import './TokenDependencies.css';

// The eslint-disable below shouldn't be necessary. The config should allow modern ES syntax.
/* eslint-disable no-restricted-syntax */

const tokens = flattenTokenTree( tokenTree );

function findByName( token ) {
	return tokens.find( ( t ) => t.name === token );
}

function guessTokenGroup( token ) {
	if ( token.name.startsWith( 'wmf-' ) ) {
		return 'wmf';
	} else if ( token.name.startsWith( 'wikit-' ) ) {
		return 'component';
	} else if (
		token.referencedTokens.length === 0 ||
		guessTokenGroup( findByName( token.referencedTokens[ 0 ] ) ) === 'wmf'
	) {
		return 'global';
	}

	return 'alias';
}

function buildDependencyChain( initialToken ) {
	const chain = [ initialToken ];
	let token = findByName( initialToken );

	while ( token.referencedTokens.length > 0 ) {
		// TODO make this work for tokens referencing multiple other tokens.
		chain.push( token.referencedTokens[ 0 ] );
		token = findByName( token.referencedTokens[ 0 ] );
	}

	return chain;
}

export function TokenDependencies() {
	const tokenGroups = [
		{
			type: 'wmf',
			tokens: [],
		},
		{
			type: 'global',
			tokens: [],
		},
		{
			type: 'alias',
			tokens: [],
		},
		{
			type: 'component',
			tokens: [],
		},
	];
	tokens.forEach( ( token ) => {
		tokenGroups.find( ( g ) => g.type === guessTokenGroup( token ) )
			.tokens.push( token.name );
	} );

	const tokenChains = [];
	tokenGroups.reverse().forEach( ( group ) => {
		group.tokens.forEach( ( token ) => {
			if ( tokenChains.some( ( chain ) => chain.includes( token ) ) ) {
				return;
			}

			tokenChains.push( buildDependencyChain( token ) );
		} );
	} );

	tokenGroups.reverse().forEach( ( group ) => group.tokens.sort() );

	const graphDiv = useRef( null );
	useEffect( () => {
		// Strange things happen without the uniqueness trick in the following line:
		// For some reason in the storybook built in CI (but not locally) maxTokensInGroup
		// was 2x what it was expected to be. Not sure what's going on there.
		tokenGroups.forEach( ( g ) => {
			g.tokens = [ ...new Set( g.tokens ) ];
		} );

		const tokenTypes = tokenGroups.map( ( t ) => t.type );

		function getTokenGroup( token ) {
			return tokenGroups.find( ( tokenType ) => tokenType.tokens.includes( token ) );
		}

		function getTokenType( token ) {
			return getTokenGroup( token ).type;
		}

		const maxTokensInGroup = d3.max( tokenGroups, ( group ) => group.tokens.length );

		const margin = { top: 20, right: 20, bottom: 30, left: 150 };
		const width = tokenGroups.length * 400 - margin.left - margin.right;
		const height = maxTokensInGroup * 30 - margin.top - margin.bottom;
		const x = d3.scaleLinear().range( [ 0, width ] );
		const y = d3.scaleLinear().range( [ height, 0 ] );

		x.domain( [ 0, tokenTypes.length ] );
		y.domain( [ 0, maxTokensInGroup ] );

		// eslint-disable-next-line func-style
		const xPos = ( token ) => x( tokenTypes.indexOf( getTokenType( token ) ) );
		// eslint-disable-next-line func-style
		const yPos = ( token ) => y( getTokenGroup( token ).tokens.indexOf( token ) );

		const svg = d3.select( graphDiv.current ).append( 'svg' )
			.attr( 'width', width + margin.left + margin.right )
			.attr( 'height', height + margin.top + margin.bottom )
			.append( 'g' )
			.attr( 'transform', `translate(${margin.left}, ${margin.top})` )
			.selectAll( 'g' )
			.data( tokenChains )
			.join( 'g' );

		// adds one line per token dependency chain to the diagram
		svg.append( 'path' )
			.attr( 'class', 'line' )
			.attr( 'd', d3.line().x( xPos ).y( yPos ) );

		// adds clickable labels
		svg.append( 'g' )
			.attr( 'font-family', 'sans-serif' )
			.attr( 'font-size', 16 )
			.attr( 'cursor', 'pointer' )
			.attr( 'stroke-linecap', 'round' )
			.attr( 'stroke-linejoin', 'round' )
			.attr( 'text-anchor', 'middle' )
			.selectAll( 'text' )
			.data( ( d ) => d )
			.join( 'text' )
			.text( ( token ) => token )
			.attr( 'dy', '0.35em' )
			.attr( 'x', xPos )
			.attr( 'y', yPos )
			.on( 'click', ( e, selectedToken ) => {
				// eslint-disable-next-line func-style
				const isSelectedPath = ( tokens ) => tokens.includes( selectedToken );
				// eslint-disable-next-line func-style
				const isPartOfSelectedPath = ( token ) => {
					return tokenChains
						.some( ( c ) => c.includes( selectedToken ) && c.includes( token ) );
				};
				svg.selectAll( 'path' )
					.style( 'stroke', ( tokens ) => isSelectedPath( tokens ) ? '#000' : '#eee' )
					.filter( isSelectedPath )
					.each( function () {
						d3.select( this.parentNode ).raise();
					} );
				svg.selectAll( 'text' )
					.style( 'fill', ( token ) => isPartOfSelectedPath( token ) ? '#000' : '#ddd' );
			} )
			.clone( true ).lower()
			.attr( 'fill', 'none' )
			.attr( 'stroke', 'white' )
			.attr( 'stroke-width', 16 );
	} );
	return ( <div ref={graphDiv} /> );
}
