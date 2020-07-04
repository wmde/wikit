import React from 'react';

export default function ( { token } ) {
	return (
		<div style={{ cursor: token.value }}>
			<pre>{ token.value }</pre>
			<p>(hover to demo)</p>
		</div>
	);
}

