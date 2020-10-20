/**
 * Generates an ID that can be used within components, e.g. for binding an input id to a label's `for` attribute
 *
 * @param {string} componentName
 * @return {string}
 */
export default function ( componentName: string ): string {
	return `${componentName}-${Math.floor( Math.random() * 1000000 )}`;
}
