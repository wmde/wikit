import PropTypes from 'prop-types';

/**
 * This allows for additional parameters (e.g. optional meta information which may be added)
 */
export const Token = PropTypes.shape( {
	name: PropTypes.string,
	referencedTokens: PropTypes.string,
	value: PropTypes.string,
} );
