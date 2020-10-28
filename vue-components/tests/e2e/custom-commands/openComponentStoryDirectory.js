module.exports.command = function openComponentStoryDirectory( componentDirectory ) {
	const directorySelector = `a[href="#${componentDirectory}"]`;
	return this.waitForElementPresent( '#root' )
		.click( directorySelector )
		.waitForElementPresent( `${directorySelector} + div` );
};
