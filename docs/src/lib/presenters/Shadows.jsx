import './Shadows.css';
import React from 'react';

export function Shadows( { token } ) {
	return (
		<div>
			<div className="shadows" style={{ boxShadow: token.value }} />
		</div>
	);
}
