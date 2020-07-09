import React from 'react';
import { Typeset } from '@storybook/addon-docs/blocks';
import { Token } from '../propTypes/Token';

export function FontSize( { token } ) {
	return (
		<Typeset
			fontSizes={[ token.value ]}
			sampleText="The quick brown fox jumps over the lazy dog"
		/>
	);
}

FontSize.propTypes = {
	token: Token,
};
