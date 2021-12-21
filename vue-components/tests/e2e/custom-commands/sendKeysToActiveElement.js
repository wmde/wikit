exports.command = function ( keys ) {
	this.elementActive( ( active ) => {
		this.elementIdAttribute( active.value.ELEMENT, 'class', ( { value: classNames } ) => {
			this.sendKeys(
				`.${classNames.split( ' ' ).join( '.' )}`,
				keys,
			);
		} );
	} );

	return this;
};
