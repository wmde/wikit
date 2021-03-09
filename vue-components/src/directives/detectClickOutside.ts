import { DirectiveBinding } from 'vue/types/options';

let handleOutsideClick: ( event: MouseEvent | TouchEvent ) => void;

export default {
	bind( element: HTMLElement, binding: DirectiveBinding ): void {
		handleOutsideClick = ( event: MouseEvent | TouchEvent ): void => {
			const callback = binding.value;
			if ( !element.contains( event.target as Node ) ) {
				callback();
			}
		};

		document.addEventListener( 'click', handleOutsideClick );
		document.addEventListener( 'touchstart', handleOutsideClick );
	},
	unbind(): void {
		document.removeEventListener( 'click', handleOutsideClick );
		document.removeEventListener( 'touchstart', handleOutsideClick );
	},
};
