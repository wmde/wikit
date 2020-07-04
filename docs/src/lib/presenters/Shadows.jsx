import styles from './../../styles/shadows.css';
import React from 'react';

export default function ( { token } ) {
	return (
		<div className="shadows" style={{ boxShadow: token.value }}>
			<pre>{ token.value }</pre>
		</div>
	);
}
