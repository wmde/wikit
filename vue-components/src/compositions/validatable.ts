import { PropType } from '@vue/composition-api';

interface ErrorProp { type?: 'error'|'warning'; message?: string }

function getFeedbackTypeFromProps( props: { error: ErrorProp } ): () => string|null {
	return () => {
		return props.error && props.error.type || null;
	};
}

const errorProp = {
	type: Object as PropType<ErrorProp>,
	validator( error: ErrorProp ): boolean {
		return error === null ||
			typeof error.message === 'string' &&
			typeof error.type === 'string' &&
			[ 'warning', 'error' ].includes( error.type );
	},
	default: null,
};

export {
	getFeedbackTypeFromProps,
	errorProp,
	ErrorProp,
};
