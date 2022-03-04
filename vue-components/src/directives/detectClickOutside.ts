import { DirectiveBinding } from 'vue';

let handleOutsideClick: ( event: MouseEvent | TouchEvent ) => void;

export default {
	beforeMount( element: HTMLElement, binding: DirectiveBinding ): void {
		handleOutsideClick = ( event: MouseEvent | TouchEvent ): void => {
			const callback = binding.value;
			if ( !element.contains( event.target as Node ) ) {
				callback();
			}
		};

		document.addEventListener( 'click', handleOutsideClick );
		document.addEventListener( 'touchstart', handleOutsideClick );
	},
	unmounted(): void {
		document.removeEventListener( 'click', handleOutsideClick );
		document.removeEventListener( 'touchstart', handleOutsideClick );
	},
};
