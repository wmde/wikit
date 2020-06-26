'use strict';

const assert = require( 'assert' ),
	{ structureForStyleDictionary } = require( './../build/wikimedia-ui-base/lib' );

assert.deepStrictEqual(
	structureForStyleDictionary(
		{
			foo: 'bar',
			'baz--lorem': 5,
		},
		'wmf-',
	),
	{
		'wmf-foo': {
			value: 'bar',
			comment: 'WMF import: @foo',
		},
		'wmf-baz--lorem': {
			value: 5,
			comment: 'WMF import: @baz--lorem',
		},
	},
);
