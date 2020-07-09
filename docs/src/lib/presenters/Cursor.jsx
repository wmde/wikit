import React from 'react';
import { Token } from '../propTypes/Token';

export function Cursor( { token } ) {
	return (
		<p style={{ cursor: token.value }}>(hover to demo)</p>
	);
}

Cursor.propTypes = {
	token: Token,
};
