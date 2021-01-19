<script lang="ts">
import Vue, { VNode } from 'vue';

// FIXME: ideally this would have a return type like "component is typeof ToggleButton" -- how to do?
function componentIsToggleButton( component: VNode ): boolean {
	if ( !component.componentOptions ) {
		return false;
	}
	return component.componentOptions.tag === 'ToggleButton';
}

export default Vue.extend( {
	name: 'ToggleButtonGroup',
	render( h ) {
		if ( !this.$scopedSlots.default ) {
			return h( 'span', 'Add buttons here' );
		}
		const children = this.$scopedSlots.default( {} ); // FIXME: how is the argument here used?
		if ( !children ) {
			return h( 'span', 'Add buttons here' );
		}

		children.forEach( ( button: VNode ) => {
			if ( !componentIsToggleButton( button ) ) {
				throw new Error( 'only ever give ToggleButtons to the ToggleButtonGroup!' );
			}
			// we now know we have a toggle button

			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			button.componentOptions.propsData.listener = this.updateSingle;
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			const buttonValue = button.componentOptions.propsData.value;
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			button.componentOptions.propsData.isActive = buttonValue === this.value;
		} );
		return h( 'span', children );
	},
	methods: {
		updateSingle( event: string ): void {
			this.$emit( 'input', event );
		},
	},
	props: {
		value: {
			required: true,
			type: String,
		},
	},
} );
</script>
