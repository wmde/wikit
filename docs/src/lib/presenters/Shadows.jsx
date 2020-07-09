import './Shadows.css';
import React from 'react';
import { Token } from '../propTypes/Token';

export function Shadows( { token } ) {
	return (
		<div>
			<div className="shadows" style={{ boxShadow: token.value }} />
		</div>
	);
}

Shadows.propTypes = {
	token: Token,
};
