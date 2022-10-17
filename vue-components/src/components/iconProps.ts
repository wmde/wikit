// eslint-disable-next-line no-shadow
export enum IconTypes {
	ADD = 'add',
	ALERT = 'alert',
	ARROWNEXT = 'arrownext',
	ARROWPREVIOUS = 'arrowprevious',
	CHECKMARK = 'checkmark',
	CLEAR = 'clear',
	CLOSE = 'close',
	EDIT = 'edit',
	ERROR = 'error',
	INFO = 'info',
	INFOOUTLINED = 'info-outlined',
	LINK = 'link',
	NEWWINDOW = 'newwindow',
	DIE = 'die',
	SEARCH = 'search',
	TRASH = 'trash'
}

/**
 * List icons that should be localized.
 */
export const flippable = [
	IconTypes.ARROWNEXT,
	IconTypes.ARROWPREVIOUS,
	IconTypes.NEWWINDOW,
];

// eslint-disable-next-line no-shadow
export enum IconDirection {
	RTL = 'rtl',
	LTR = 'ltr'
}

export const iconColors = [
	'base',
	'subtle',
	'emphasized',
	'inverted',
	'warning',
	'error',
	'notice',
	'success',
	'inherit',
];

export const iconSizes = [ 'xsmall', 'small', 'medium', 'large' ];
