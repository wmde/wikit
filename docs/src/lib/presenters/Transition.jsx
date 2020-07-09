import './Transition.css';
import React from 'react';

export function Transition( { token } ) {
	return (
		<div className="transition" style={{ transitionDuration: token.value }}/>
	);
}
