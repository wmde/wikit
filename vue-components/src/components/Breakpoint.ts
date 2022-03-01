// eslint-disable-next-line no-shadow
enum Breakpoint {
	Mobile = 'mobile',
	Tablet = 'tablet',
	Desktop = 'desktop'
}

function validateBreakpoint( breakpoint: string ): boolean {
	return Object.values( Breakpoint ).includes( breakpoint as Breakpoint );
}

export {
	Breakpoint,
	validateBreakpoint,
};
