import React from 'react';
import './Color.css';

/**
 * Inspired by { ColorItem } from '@storybook/addon-docs/blocks';
 * Unfortunately its swatch is not usable independently
 *
 * @param {{ token: { value: string } }} token
 *
 * @return {React.Component}
 */
export function Color( { token } ) {
	return (
		<div className='color' style={{ backgroundColor: token.value }} />
	);
}
