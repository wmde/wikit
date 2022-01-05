exports.command = function ( keys ) {
	this.elementActive( ( active ) => {
		const activeElementId = Object.values( active.value )[ 0 ];

		this.elementIdAttribute( activeElementId, 'class', ( { value: classNames } ) => {
			this.sendKeys(
				`.${classNames.split( ' ' ).join( '.' )}`,
				keys,
			);
		} );
	} );

	return this;
};
