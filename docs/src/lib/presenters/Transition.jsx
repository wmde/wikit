import './Transition.css';
import React from 'react';
import { Token } from '../propTypes/Token';

export function Transition( { token } ) {
	return (
		<div className="transition" style={{ transitionDuration: token.value }}/>
	);
}

Transition.propTypes = {
	token: Token,
};
