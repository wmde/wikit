import './LineHeight.css';
import React from 'react';

const demoFontSizes = [ '14px', '16px', '18px' ];

export function LineHeight( { token } ) {
	return (
		<dl>
			{
				demoFontSizes.map( ( fontSize ) => {
					return (
						<div key={ fontSize } className='lineHeightContainer'>
							<dt>@ { fontSize } font size</dt>
							<dd className='lineHeight' style={{ lineHeight: token.value, fontSize }}>
								The quick brown jumps<br />
								over the lazy dog<br />
							</dd>
						</div>
					);
				} )
			}
		</dl>
	);
}
