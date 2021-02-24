export default function ( value: string ): boolean {
	const numberRegex = '(?:[-+]\\s*)?(?:[\\d,]+\\.\\d*|\\.\\d+|[\\d,]+)(?:[eE][-+]?\\d+)?';
	const mainRegex = '^\\s*' + numberRegex + '([~!]|(?:\\+\\/?-|±)' + numberRegex + '|)\\s*$';
	const regex = RegExp( mainRegex );
	return regex.test( value );
}
