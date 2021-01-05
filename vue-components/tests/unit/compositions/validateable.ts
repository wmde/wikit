import { getFeedbackTypeFromProps, errorProp } from '@/compositions/validatable';

describe( 'validatable composition', () => {
	it( 'gets the feedback type from an error prop', () => {
		const feedbackType = 'warning' as const;
		const testProps = {
			error: {
				type: feedbackType,
				messsage: 'something',
			},
		};

		expect( getFeedbackTypeFromProps( testProps ) ).toBe( feedbackType );
	} );

	describe( 'error prop validation', () => {
		it( 'accepts "warning" error type', () => {
			expect( errorProp.validator( { type: 'warning' } ) ).toBe( true );
		} );

		it( 'accepts "error" error type', () => {
			expect( errorProp.validator( { type: 'error' } ) ).toBe( true );
		} );

		it( 'disallows other error types', () => {
			expect( errorProp.validator( { type: 'notice' } ) ).toBe( false );
		} );
	} );
} );
