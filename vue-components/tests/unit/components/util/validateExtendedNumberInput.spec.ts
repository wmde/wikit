import validateExtendedNumberInput from '@/components/util/validateExtendedNumberInput';

describe( 'validateExtendedNumberInput', () => {

	describe( 'valid', () => {
		it.each( [
			[ '42' ],
			[ '.12345' ],
			[ '3.14156' ],
			[ '-12345' ],
			[ '+12345' ],
			[ '12,345.56' ],
			[ '-12,345.56' ],
			[ '+12,345.56' ],
			[ '1e6' ],
			[ '+1e6' ],
			[ '-1e6' ],
			[ '-1e6+-10' ],
			[ '-1e6±10' ],
			[ '1E6' ],
			[ '+1E6' ],
			[ '-1E6' ],
			[ '-1E6+-10' ],
			[ '-1E6±10' ],
			[ '1E-6' ],
			[ '+1E-6' ],
			[ '-1E-6' ],
			[ '-1E-6+-10' ],
			[ '-1E-6±10' ],
			[ '1e-6' ],
			[ '+1e-6' ],
			[ '-1e-6' ],
			[ '-1e-6+-10' ],
			[ '-1e-6±10' ],
			[ '+1e6' ],
			[ '+1e6+-10' ],
			[ '+1e6±10' ],
			[ '1e6+-10e3' ],
			[ '1e6±10.4' ],
			[ '1+-10' ],
			[ '1±10' ],
			[ '-12,345!' ],
			[ '-12,345~' ],
			[ '+12,345!' ],
			[ '+12,345~' ],
		] )( "when the input is '%s'", ( text ) => {
			expect( validateExtendedNumberInput( text ) ).toBe( true );
		} );
	} );

	describe( 'invalid', () => {
		it.each( [
			[ '123.4.5' ],
			[ '.1234,5' ],
			[ '1/3' ],
			[ '12f345.56' ],
			[ 'abcde' ],
			[ '10m' ],
			[ '-1e6+-10$' ],
			[ '4%' ],
			[ '78=65' ],
			[ '(nice)' ],
			[ 'متن فارسی' ],
			[ '-12,345±10!' ],
			[ '-12,345±10~' ],
		] )( "when the input is '%s'", ( text ) => {
			expect( validateExtendedNumberInput( text ) ).toBe( false );
		} );
	} );
} );
