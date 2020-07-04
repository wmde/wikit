import React from 'react';
import { Typeset } from '@storybook/addon-docs/blocks';

export default function ( { token } ) {
	return (
		<Typeset
			fontSizes={[ token.value ]}
			sampleText="The quick brown fox jumps over the lazy dog"
		/>
	);
}
