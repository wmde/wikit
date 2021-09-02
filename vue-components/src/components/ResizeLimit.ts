enum ResizeLimit {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
	None = 'none'
}

function validateLimit( limit: string ): boolean {
	return Object.values( ResizeLimit ).includes( limit as ResizeLimit );
}

export {
	ResizeLimit,
	validateLimit,
};
