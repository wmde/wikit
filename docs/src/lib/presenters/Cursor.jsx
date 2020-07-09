import React from 'react';

export function Cursor( { token } ) {
	return (
		<p style={{ cursor: token.value }}>(hover to demo)</p>
	);
}
