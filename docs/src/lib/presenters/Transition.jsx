import styles from './../../styles/transition.css';
import React from 'react';

export default function ( { token } ) {
	return (
		<div>
			<pre>{ token.value }</pre>
			<div className="transition" style={{ transitionDuration: token.value }}/>
		</div>
	);
}
