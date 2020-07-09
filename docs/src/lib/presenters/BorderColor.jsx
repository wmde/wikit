import React from 'react';

export function BorderColor( { token } ) {
	return (
		<div className='color' style={{ border: `2px solid ${token.value}`, backgroundColor: '#fff' }} />
	);
}
