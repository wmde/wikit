import './LineHeight.css';
import React from 'react';
import { Token } from '../propTypes/Token';

export function LineHeight( { token } ) {
	return (
		<div className='lineHeight' style={{ lineHeight: token.value }}>
			The quick brown jumps<br />
			over the lazy dog<br />
		</div>
	);
}

LineHeight.propTypes = {
	token: Token,
};
