import './LineHeight.css';
import React from 'react';

export default function ( { token } ) {
	return (
		<div className='lineHeight' style={{ lineHeight: token.value }}>
			The quick brown jumps<br />
			over the lazy dog<br />
		</div>
	);
}
