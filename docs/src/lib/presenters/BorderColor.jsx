import React from 'react';
import { Token } from '../propTypes/Token';

export function BorderColor( { token } ) {
	return (
		<div className='color' style={{ border: `2px solid ${token.value}`, backgroundColor: '#fff' }} />
	);
}

BorderColor.propTypes = {
	token: Token,
};
