/**
 * This is essentially a reimplementation of https://nightwatchjs.org/api/keys.html which
 * does not work in Firefox. See https://github.com/nightwatchjs/nightwatch/issues/2468
 *
 * It sends keys to the currently active element by finding it using `.elementActive()`,
 * then building a selector for it based on its class-attribute, and then sending keys to
 * it using this selector with `.sendKeys()`.
 *
 * @param {string|Array} keys key(s) to send
 * @return {self}
 */
exports.command = function ( keys ) {
	this.elementActive( ( active ) => {
		const activeElementId = Object.values( active.value )[ 0 ];

		this.elementIdAttribute( activeElementId, 'class', ( { value: classNames } ) => {
			this.sendKeys(
				`.${classNames.split( ' ' ).join( '.' )}`, // build a selector based on the element's classes
				keys,
			);
		} );
	} );

	return this;
};
