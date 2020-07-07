import './Transition.css';
import React from 'react';

export default function ( { token } ) {
	return (
		<div className="transition" style={{ transitionDuration: token.value }}/>
	);
}
