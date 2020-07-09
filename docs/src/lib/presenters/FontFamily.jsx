import React from 'react';
import { Typeset } from '@storybook/addon-docs/blocks';
import { Token } from '../propTypes/Token';

export function FontFamily( { token } ) {
	return (
		<Typeset
			fontSizes={[ '16px' ]}
			fontFamily={ token.value }
			sampleText="The quick brown fox jumps over the lazy dog"
		/>
	);
}

FontFamily.propTypes = {
	token: Token,
};
