enum ResizeLimit {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
	Both = 'both',
	None = 'none'
}

function validateLimit( limit: string ): boolean {
	return Object.values( ResizeLimit ).includes( limit as ResizeLimit );
}

export {
	ResizeLimit,
	validateLimit,
};
