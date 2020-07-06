import React from 'react';
import styles from './../../styles/color.css';

/**
 * Inspired by { ColorItem } from '@storybook/addon-docs/blocks';
 * Unfortunately its swatch is not usable independently
 */
export default function ( { token } ) {
	return (
		<div>
			<div className='color' style={{ backgroundColor: token.value }} />
			<pre>{ token.value }</pre>
		</div>
	);
}

