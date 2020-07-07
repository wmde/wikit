import React from 'react';

export default function ( { token } ) {
	return (
		<div className='color' style={{ border: `2px solid ${token.value}`, backgroundColor: '#fff' }} />
	);
}
