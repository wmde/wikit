import React from 'react';
import { Typeset } from '@storybook/addon-docs/blocks';

export function FontWeight( { token } ) {
	return (
		<Typeset
			fontSizes={[ '16px' ]}
			fontWeight={ token.value }
			sampleText="The quick brown fox jumps over the lazy dog"
		/>
	);
}
