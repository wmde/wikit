import React from 'react';

export default function ( { token } ) {
	return (
		<p style={{ cursor: token.value }}>(hover to demo)</p>
	);
}

