const numberRegex = '(?:[-+]\\s*)?(?:[\\d]+\\.\\d*|\\.\\d+|[\\d]+)(?:[eE][-+]?\\d+)?';
// eslint-disable-next-line max-len
const mainRegex = '^\\s*(?<number>' + numberRegex + ')(?:(?<precisionMark>[~!])|(?: ?\\+\\/?- ?| ?± ?)(?<precision>' + numberRegex + ')|)\\s*$';

export function validateExtendedNumberInput( value: string ): boolean {
	const regex = RegExp( mainRegex );
	return regex.test( value );
}

export type PreciseNumber = {
	number: number;
	precision: number | null;
};

function parsePrecision( text: string | undefined ): number | null {
	if ( text === undefined ) {
		return null;
	}
	if ( text === '!' ) {
		return 0.0;
	}
	if ( text === '~' ) {
		return 0.5;
	}
	return Math.abs( parseFloat( text ) );
}

export function parseExtendedNumber( value: string ): PreciseNumber {
	const match = value.match( mainRegex );
	if ( match === null || match.groups === undefined ) {
		throw new Error( 'Parse Error' );
	}
	return {
		number: parseFloat( match.groups.number ),
		precision: parsePrecision( match.groups.precisionMark || match.groups.precision ),
	};
}
