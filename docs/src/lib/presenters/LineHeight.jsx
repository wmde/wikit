import styles from './../../styles/line-height.css';
import React from 'react';

export default function ( { token } ) {
	return (
		<div>
			<pre>{ token.value }</pre>
			<div className='lineHeight' style={{ lineHeight: token.value }}>
				The quick brown fox jumps over the lazy dog
			</div>
		</div>
	);
}
