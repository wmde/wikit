import './Shadows.css';
import React from 'react';

export default function ( { token } ) {
	return (
		<div>
			<div className="shadows" style={{ boxShadow: token.value }} />
		</div>
	);
}
